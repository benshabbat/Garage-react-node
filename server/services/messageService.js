import Message from "../models/Message.js";
import User from "../models/User.js";

const createMessage = async (req) => {
  const from = req.params.from;
  const to = req.params.to;
  const newMessage = new Message({ ...req.body, to, from });
  try {
    const savedMessage = await newMessage.save();
    try {
      await User.findByIdAndUpdate(from, {
        $push: { messages: [savedMessage._id] },
      });
      await User.findByIdAndUpdate(to, {
        $push: { messages: [savedMessage._id] },
      });
    } catch (error) {
      throw Error(error);
    }
    return savedMessage;
  } catch (error) {
    throw Error(error);
  }
};
const createMessageToAdmin = async (req) => {
  // const from = req.params.from;
  const to = req.params.to;
  const { from } = req.body;
  const newMessage = new Message({
    ...req.body,
    to,
    // from: from
  });
  try {
    const savedMessage = await newMessage.save();
    try {
      await User.findByIdAndUpdate(from, {
        $push: { messages: [savedMessage._id] },
      });
      await User.findByIdAndUpdate(to, {
        $push: { messages: [savedMessage._id] },
      });
      return savedMessage;
    } catch (error) {
      throw Error(error);
    }
  } catch (error) {
    throw Error(error);
  }
};

const updateMessage = async (req) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.idMessage,
      {
        $set: { read: true },
      },
      { new: true }
    );
    return updatedMessage;
  } catch (error) {
    throw Error(error);
  }
};
const deleteMessage = async (req) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    return "The Message has been removed";
  } catch (error) {
    throw Error(error);
  }
};
const getMessage = async (req) => {
  try {
    const message = await Message.findById(req.params.id);
    return message;
  } catch (error) {
    throw Error(error);
  }
};
const getMessageByUser = async (req) => {
  try {
    const messagesTo = await Message.find({ to: req.params.id })
      .populate("to")
      .populate("from");
    const messagesFrom = await Message.find({ from: req.params.id })
      .populate("from")
      .populate("to");
    return messagesTo.concat(messagesFrom);
  } catch (error) {
    throw Error(error);
  }
};
const getMessages = async () => {
  try {
    const messages = await Message.find();
    return messages;
  } catch (error) {
    throw Error(error);
  }
};
const getMessagesByType = async (req) => {
  const type = req.query.populate;
  try {
    const messages = await Message.find().populate(type);
    return messages;
  } catch (error) {
    throw Error(error);
  }
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
