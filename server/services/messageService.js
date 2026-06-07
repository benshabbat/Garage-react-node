import Message from "../models/Message.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { getPaginationParams, pickAllowed, getPaginatedWithPopulate } from "../utils/queryHelpers.js";

const ALLOWED_MESSAGE_POPULATE_FIELDS = ['from', 'to'];
const ALLOWED_MESSAGE_FIELDS = ['title', 'description'];

const createMessage = async (req) => {
  const from = req.user.id; // always use authenticated user's ID, never trust URL param
  const to = req.params.to;
  const recipientExists = await User.exists({ _id: to });
  if (!recipientExists) throw createError(404, "Recipient not found");
  const safeBody = pickAllowed(req.body, ALLOWED_MESSAGE_FIELDS);
  const newMessage = new Message({ ...safeBody, to, from });
  const savedMessage = await newMessage.save();
  await User.findByIdAndUpdate(from, {
    $push: { messages: [savedMessage._id] },
  });
  await User.findByIdAndUpdate(to, {
    $push: { messages: [savedMessage._id] },
  });
  return savedMessage;
};

const createMessageToAdmin = async (req) => {
  const to = req.params.to;
  const recipientExists = await User.exists({ _id: to });
  if (!recipientExists) throw createError(404, "Recipient not found");
  const safeBody = pickAllowed(req.body, ALLOWED_MESSAGE_FIELDS);
  const newMessage = new Message({ ...safeBody, to, from: req.user.id });
  const savedMessage = await newMessage.save();
  await User.findByIdAndUpdate(to, {
    $push: { messages: [savedMessage._id] },
  });
  return savedMessage;
};

const updateMessage = async (req) => {
  const message = await Message.findById(req.params.id);
  if (!message) throw createError(404, "Message not found");
  if (message.to.toString() !== req.user.id && !req.user.isAdmin) {
    throw createError(403, "Not authorized to update this message");
  }
  const updatedMessage = await Message.findByIdAndUpdate(
    req.params.id,
    { $set: { read: true } },
    { new: true }
  );
  return updatedMessage;
};

const deleteMessage = async (req) => {
  const message = await Message.findById(req.params.id);
  if (!message) throw createError(404, "Message not found");
  const userId = req.user.id;
  const isParticipant =
    message.from?.toString() === userId ||
    message.to.toString() === userId;
  if (!isParticipant && !req.user.isAdmin) {
    throw createError(403, "Not authorized to delete this message");
  }
  await Message.findByIdAndDelete(req.params.id);
  return "The Message has been removed";
};

const getMessage = async (req) => {
  const message = await Message.findById(req.params.id);
  if (!message) throw createError(404, "Message not found");
  const userId = req.user.id;
  const isParticipant =
    message.from?.toString() === userId ||
    message.to.toString() === userId;
  if (!isParticipant && !req.user.isAdmin) {
    throw createError(403, "Not authorized to view this message");
  }
  return message;
};

const getMessageByUser = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const messages = await Message.find({
    $or: [{ to: req.params.id }, { from: req.params.id }],
  })
    .populate("to", "-password")
    .populate("from", "-password")
    .skip((page - 1) * limit)
    .limit(limit);
  return messages;
};

const getMessages = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const messages = await Message.find().skip((page - 1) * limit).limit(limit);
  return messages;
};

const getMessagesByType = async (req) =>
  getPaginatedWithPopulate(Message, req, ALLOWED_MESSAGE_POPULATE_FIELDS, { populateSelect: '-password' });

const messageService = {
  createMessage,
  createMessageToAdmin,
  updateMessage,
  deleteMessage,
  getMessage,
  getMessageByUser,
  getMessages,
  getMessagesByType,
};

export default messageService;
