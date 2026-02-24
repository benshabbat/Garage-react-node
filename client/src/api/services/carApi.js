import axios from "../../axiosConfig.js";
import { createCrudOperations } from "../crudOperations.js";
import { API_URL_CAR } from "../apiEndpoints.js";

const carOps = createCrudOperations(API_URL_CAR);

/**
 * Car API operations
 */
export const carApi = {
  // Get all cars
  getAll: carOps.getAll,
  
  // Get car by ID
  getById: carOps.getById,
  
  // Create new car for user
  create: async (userId, data) => {
    const response = await axios.post(`${API_URL_CAR}/${userId}`, data);
    return response.data;
  },
  
  // Update car
  update: carOps.update,
  
  // Delete car (requires car ID and user ID)
  delete: async (carId, userId) => {
    const response = await axios.delete(`${API_URL_CAR}/${carId}/${userId}`);
    return response.data;
  },
  
  // Get cars with populated owner data
  getWithOwner: async () => {
    const response = await axios.get(`${API_URL_CAR}/populate?populate=owner`);
    return response.data;
  },
};

// Legacy exports for backwards compatibility
export const getCars = carApi.getAll;
export const createCar = carApi.create;
export const updateCar = carApi.update;
export const deleteCar = carApi.delete;
export const getCarsByType = carApi.getWithOwner;