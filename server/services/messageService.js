import Message from "../models/Message.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

const ALLOWED_MESSAGE_POPULATE_FIELDS = ['from', 'to'];

const createMessage = async (req) => {
  const from = req.params.from;
  const to = req.params.to;
  const newMessage = new Message({ ...req.body, to, from });
  const savedMessage = await newMessage.save();
  await User.findByIdAndUpdate(from, {
    $push: { messages: [savedMessage._id] },
  });
  await User.findByIdAndUpdate(to, {
    $push: { messages: [savedMessage._id] },
  });
  return savedMessage;
};
const ALLOWED_PUBLIC_MESSAGE_FIELDS = ['content', 'subject'];

const createMessageToAdmin = async (req) => {
  const to = req.params.to;
  const safeBody = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => ALLOWED_PUBLIC_MESSAGE_FIELDS.includes(k))
  );
  const newMessage = new Message({ ...safeBody, to, from: null });
  const savedMessage = await newMessage.save();
  await User.findByIdAndUpdate(to, {
    $push: { messages: [savedMessage._id] },
  });
  return savedMessage;
};

const updateMessage = async (req) => {
  const updatedMessage = await Message.findByIdAndUpdate(
    req.params.id,
    {
      $set: { read: true },
    },
    { new: true }
  );
  if (!updatedMessage) throw createError(404, "Message not found");
  return updatedMessage;
};

const deleteMessage = async (req) => {
  await Message.findByIdAndDelete(req.params.id);
  return "The Message has been removed";
};

const getMessage = async (req) => {
  const message = await Message.findById(req.params.id);
  return message;
};

const getMessageByUser = async (req) => {
  const messages = await Message.find({
    $or: [{ to: req.params.id }, { from: req.params.id }],
  }).populate("to").populate("from");
  return messages;
};

const getMessages = async (req) => {
  const limit = Math.min(parseInt(req.query.limit) || 500, 500);
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const messages = await Message.find().skip((page - 1) * limit).limit(limit);
  return messages;
};

const getMessagesByType = async (req) => {
  const type = req.query.populate;
  if (!ALLOWED_MESSAGE_POPULATE_FIELDS.includes(type)) {
    throw createError(400, `Invalid populate field. Allowed: ${ALLOWED_MESSAGE_POPULATE_FIELDS.join(', ')}`);
  }
  const messages = await Message.find().populate(type);
  return messages;
};

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
