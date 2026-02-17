import messageService from "../services/messageService.js";
import { createHandler } from "../utils/controllerFactory.js";

// Create message handler
export const createMessage = createHandler(messageService.createMessage, 201);

// Create message to admin handler
export const createMessageToAdmin = createHandler(messageService.createMessageToAdmin, 201);

// Update message handler
export const updateMessage = createHandler(messageService.updateMessage, 200);

// Delete message handler with custom message
export const deleteMessage = createHandler(
  messageService.deleteMessage,
  200,
  "The Message has been removed"
);

// Get single message handler
export const getMessage = createHandler(messageService.getMessage, 200);

// Get message by user handler
export const getMessageByUser = createHandler(messageService.getMessageByUser, 200);

// Get all messages handler
export const getMessages = createHandler(messageService.getMessages, 200);

// Get messages by type handler
export const getMessagesByType = createHandler(messageService.getMessagesByType, 200);
