import axios from "../../axiosConfig.js";
import { createCrudOperations } from "../crudOperations.js";
import { API_URL_USER, API_URL_REGISTER } from "../apiEndpoints.js";

const userOps = createCrudOperations(API_URL_USER);

/**
 * User API operations
 */
export const userApi = {
  // Get all users
  getAll: userOps.getAll,
  
  // Get user by ID
  getById: userOps.getById,
  
  // Create new user (register)
  create: (data) => axios.post(API_URL_REGISTER, data),
  
  // Update user
  update: userOps.update,
  
  // Delete user
  delete: userOps.delete,
};

// Legacy exports for backwards compatibility
export const getUsers = userApi.getAll;
export const getUserId = userApi.getById;
export const createUser = userApi.create;
export const updateUser = userApi.update;
export const deleteUser = userApi.delete;
