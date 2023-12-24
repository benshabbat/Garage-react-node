import messageService from "../services/messageService.js";
export const createMessage = async (req, res, next) => {
  try {
    const savedMessage = await messageService.createMessage(req);
    res.status(200).json(savedMessage);
  } catch (err) {
    next(err);
  }
};
export const createMessageToAdmin = async (req, res, next) => {
  try {
    const savedMessage = await messageService.createMessageToAdmin(req);
    res.status(200).json(savedMessage);
  } catch (err) {
    next(err);
  }
};

export const updateMessage = async (req, res, next) => {
  try {
    const updatedMessage = await messageService.updateMessage(req);
    res.status(200).json(updatedMessage);
  } catch (error) {
    next(error);
  }
};
export const deleteMessage = async (req, res, next) => {
  try {
    await messageService.deleteMessage(req);
    res.status(200).json("The Message has been removed");
  } catch (error) {
    next(error);
  }
};
export const getMessage = async (req, res, next) => {
  try {
    const message = await messageService.getMessage(req);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
export const getMessageByUser = async (req, res, next) => {
  try {
    const messages = await messageService.getMessageByUser(req);
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getMessages();
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
export const getMessagesByType = async (req, res, next) => {
  try {
    const messages = await messageService.getMessagesByType(req);
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
