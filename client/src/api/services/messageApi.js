import axios from "../../axiosConfig.js";
import { createCrudOperations } from "../crudOperations.js";
import { API_URL_MESSAGES } from "../apiEndpoints.js";

const messageOps = createCrudOperations(API_URL_MESSAGES);

const getAdminId = async () => {
  const { data } = await axios.get("/auth/admin-id");
  return data.adminId;
};

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
    const adminId = await getAdminId();
    const response = await axios.post(`${API_URL_MESSAGES}/to/${adminId}`, data);
    return response.data;
  },

  // Create service request — same endpoint as createToAdmin
  createServiceRequest(data) {
    return messageApi.createToAdmin(data);
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
