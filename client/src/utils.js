import axios from "./axiosConfig.js";

export const API_URL_CAR = "/cars";
export const API_URL_USER = "/users";
export const API_URL_SERVICE = "/services";
export const API_URL_MESSAGES = "/messages";
export const API_URL_REGISTER = "/auth/register";
export const API_URL_REVIEWS = "/reviews";
export const API_URL_CONTACTS = "/contacts";
export const ADMIN = "63e14deca4340e45d23f20b2";

/**
 * Generic CRUD operations factory
 */
const createCrudOperations = (baseUrl) => ({
  getAll: async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await axios.post(baseUrl, data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  },
});

// Resource-specific CRUD operations
const userOps = createCrudOperations(API_URL_USER);
const serviceOps = createCrudOperations(API_URL_SERVICE);
const carOps = createCrudOperations(API_URL_CAR);
const messageOps = createCrudOperations(API_URL_MESSAGES);
const reviewOps = createCrudOperations(API_URL_REVIEWS);
const contactOps = createCrudOperations(API_URL_CONTACTS);

// Legacy function names (for backwards compatibility)
const getAll = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const getById = async (url, id) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

const addItem = async (url, obj) => {
  const response = await axios.post(url, obj);
  return response.data;
};

// User operations
const createUser = (obj) => axios.post(API_URL_REGISTER, obj);
const updateUser = (id, obj) => userOps.update(id, obj);
const deleteUser = (id) => userOps.delete(id);
const getUserId = (id) => userOps.getById(id);
const getUsers = userOps.getAll;

// Service operations
const updateService = (id, obj) => serviceOps.update(id, obj);
const deleteService = (id) => serviceOps.delete(id);
const createService = (id, obj) => axios.post(`${API_URL_SERVICE}/${id}`, obj);
const createReqService = (obj) => axios.post(`${API_URL_MESSAGES}/to/${ADMIN}`, obj);
const getServices = serviceOps.getAll;

// Car operations
const updateCar = (id, obj) => carOps.update(id, obj);
const deleteCar = (idCar, idUser) => axios.delete(`${API_URL_CAR}/${idCar}/${idUser}`);
const createCar = (id, obj) => axios.post(`${API_URL_CAR}/${id}`, obj);
const getCars = carOps.getAll;

// Review operations
const createReview = reviewOps.create;
const getReviews = reviewOps.getAll;

// Contact operations
const createContact = contactOps.create;
const deleteContact = contactOps.delete;
const getContacts = contactOps.getAll;

// Message operations
const deleteMessage = messageOps.delete;
const createMessage = (obj, to) => axios.post(`${API_URL_MESSAGES}/to/${to}`, obj);
const createMessageToAdmin = (obj) => axios.post(`${API_URL_MESSAGES}/to/${ADMIN}`, obj);
const getMessages = messageOps.getAll;

// Advanced queries with population
const getCarsByType = async () => {
  const response = await axios.get(`${API_URL_CAR}/populate?populate=owner`);
  return response.data;
};

const getServicesByType = async () => {
  const response = await axios.get(`${API_URL_SERVICE}/populate?populate=car`);
  return response.data;
};

const getMessagesContact = async () => {
  const data = await getAll(API_URL_CONTACTS);
  return data || [];
};

export {
  createReview,
  getReviews,
  createMessageToAdmin,
  createMessage,
  createService,
  createUser,
  createReqService,
  updateService,
  getAll,
  getById,
  addItem,
  updateUser,
  deleteUser,
  createCar,
  getUserId,
  deleteCar,
  updateCar,
  deleteService,
  deleteMessage,
  getContacts,
  createContact,
  deleteContact,
  getUsers,
  getServices,
  getCars,
  getCarsByType,
  getServicesByType,
  getMessagesContact,
  getMessages,
};

export function getMomentFromUpdatedAt(updatedAt) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(updatedAt);
  const now = new Date();
  const diffSeconds = Math.floor((now - date) / 1000);

  // Calculate time units
  const units = {
    years: Math.floor(diffSeconds / (365 * 24 * 60 * 60)),
    months: Math.floor(diffSeconds / (30 * 24 * 60 * 60)),
    days: Math.floor(diffSeconds / (24 * 60 * 60)),
    hours: Math.floor(diffSeconds / (60 * 60)),
    minutes: Math.floor(diffSeconds / 60),
    seconds: diffSeconds
  };

  // Determine time ago string
  let timeAgo;
  if (units.years > 0) timeAgo = `${units.years} years`;
  else if (units.months > 0) timeAgo = `${units.months} months`;
  else if (units.days > 0) timeAgo = `${units.days} days`;
  else if (units.hours > 0) timeAgo = `${units.hours} hours`;
  else if (units.minutes > 0) timeAgo = `${units.minutes} minutes`;
  else timeAgo = `${units.seconds} seconds`;

  // Format date and time
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const monthName = months[date.getMonth()];
  
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return {
    theDate: `${day}/${month}/${year}`,
    theTime: `${formattedHours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}${ampm}`,
    theTimeAgo: `${timeAgo} ago`,
    monthName
  };
}
