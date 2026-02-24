import axios from "../../axiosConfig.js";
import { createCrudOperations } from "../crudOperations.js";
import { API_URL_SERVICE } from "../apiEndpoints.js";

const serviceOps = createCrudOperations(API_URL_SERVICE);

/**
 * Service API operations
 */
export const serviceApi = {
  // Get all services
  getAll: serviceOps.getAll,
  
  // Get service by ID
  getById: serviceOps.getById,
  
  // Create new service for car
  create: async (carId, data) => {
    const response = await axios.post(`${API_URL_SERVICE}/${carId}`, data);
    return response.data;
  },
  
  // Update service
  update: serviceOps.update,
  
  // Delete service
  delete: serviceOps.delete,
  
  // Get services with populated car data
  getWithCar: async () => {
    const response = await axios.get(`${API_URL_SERVICE}/populate?populate=car`);
    return response.data;
  },
};

// Legacy exports for backwards compatibility
export const getServices = serviceApi.getAll;
export const createService = serviceApi.create;
export const updateService = serviceApi.update;
export const deleteService = serviceApi.delete;
export const getServicesByType = serviceApi.getWithCar;