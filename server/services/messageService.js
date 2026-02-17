import Message from "../models/Message.js";
import User from "../models/User.js";

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
const createMessageToAdmin = async (req) => {
  const to = req.params.to;
  const { from } = req.body;
  const newMessage = new Message({
    ...req.body,
    to,
  });
  const savedMessage = await newMessage.save();
  if (from) {
    await User.findByIdAndUpdate(from, {
      $push: { messages: [savedMessage._id] },
    });
  }
  await User.findByIdAndUpdate(to, {
    $push: { messages: [savedMessage._id] },
  });
  return savedMessage;
};

const updateMessage = async (req) => {
  const updatedMessage = await Message.findByIdAndUpdate(
    req.params.idMessage,
    {
      $set: { read: true },
    },
    { new: true }
  );
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
  const messagesTo = await Message.find({ to: req.params.id })
    .populate("to")
    .populate("from");
  const messagesFrom = await Message.find({ from: req.params.id })
    .populate("from")
    .populate("to");
  return messagesTo.concat(messagesFrom);
};

const getMessages = async () => {
  const messages = await Message.find();
  return messages;
};

const getMessagesByType = async (req) => {
  const type = req.query.populate;
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
