import axios from "../axiosConfig.js";

/**
 * Generic CRUD operations factory
 * Creates standard CRUD methods for a given API endpoint
 * @param {string} baseUrl - Base URL for the resource
 * @returns {Object} CRUD operation functions
 */
export const createCrudOperations = (baseUrl) => ({
  /**
   * Get all items
   */
  getAll: async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  },
  
  /**
   * Get item by ID
   */
  getById: async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  },
  
  /**
   * Create new item
   */
  create: async (data) => {
    const response = await axios.post(baseUrl, data);
    return response.data;
  },
  
  /**
   * Update existing item
   */
  update: async (id, data) => {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  },
  
  /**
   * Delete item
   */
  delete: async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  },
});

/**
 * Legacy function - Get all items from URL
 * @deprecated Use createCrudOperations instead
 */
export const getAll = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

/**
 * Legacy function - Get item by ID from URL
 * @deprecated Use createCrudOperations instead
 */
export const getById = async (url, id) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

/**
 * Legacy function - Add item to URL
 * @deprecated Use createCrudOperations instead
 */
export const addItem = async (url, obj) => {
  const response = await axios.post(url, obj);
  return response.data;
};
