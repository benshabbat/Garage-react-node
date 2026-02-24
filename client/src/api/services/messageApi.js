import axios from "../../axiosConfig.js";
import { createCrudOperations } from "../crudOperations.js";
import { API_URL_MESSAGES, ADMIN_ID } from "../apiEndpoints.js";

const messageOps = createCrudOperations(API_URL_MESSAGES);

/**
 * Message API operations
 */
export const messageApi = {
  // Get all messages
  getAll: messageOps.getAll,
  
  // Get message by ID
  getById: messageOps.getById,
  
  // Create message to specific user
  create: async (data, toUserId) => {
    const response = await axios.post(`${API_URL_MESSAGES}/to/${toUserId}`, data);
    return response.data;
  },
  
  // Create message to admin
  createToAdmin: async (data) => {
    const response = await axios.post(`${API_URL_MESSAGES}/to/${ADMIN_ID}`, data);
    return response.data;
  },
  
  // Create service request (message to admin)
  createServiceRequest: async (data) => {
    const response = await axios.post(`${API_URL_MESSAGES}/to/${ADMIN_ID}`, data);
    return response.data;
  },
  
  // Delete message
  delete: messageOps.delete,
};

// Legacy exports for backwards compatibility
export const getMessages = messageApi.getAll;
export const createMessage = messageApi.create;
export const createMessageToAdmin = messageApi.createToAdmin;
export const createReqService = messageApi.createServiceRequest;
export const deleteMessage = messageApi.delete;