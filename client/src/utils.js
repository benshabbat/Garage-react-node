import axios from "./axiosConfig.js";
export const API_URL_CAR = "/cars";
export const API_URL_USER = "/users";
export const API_URL_SERVICE = "/services";
export const API_URL_MESSAGES = "/messages";
export const API_URL_REGISTER = "/auth/register";
export const API_URL_REVIEWS = "/reviews";
export const API_URL_CONTACTS = "/contacts";
export const ADMIN = "63e14deca4340e45d23f20b2";

const apiRequest = async (method, url, data = null) => {
  try {
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    console.error(`Error with ${method.toUpperCase()} request to ${url}:`, error);
    throw error;
  }
};



const getAll = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data; // מחזיר את הנתונים בלבד
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};
const getById = (url, id) => {
  return axios.get(`${url}/${id}`);
  
};
const addItem = (url, obj) => {
  axios.post(url, obj);
};
const createUser = async (obj) => {
  return await axios.post(API_URL_REGISTER, obj);
};
const updateUser = (id, obj) => {
  
  axios.put(`${API_URL_USER}/${id}`, obj);
};
const updateService = (id, obj) => {
  return axios.put(`${API_URL_SERVICE}/${id}`, obj);
};
const updateCar = (id, obj) => {
  axios.put(`${API_URL_CAR}/${id}`, obj);
};
const createCar = (id, obj) => {
  axios.post(`${API_URL_CAR}/${id}`, obj);
};
const createReview = (obj) => {
  axios.post(`${API_URL_REVIEWS}`, obj);
};
const createService = (id, obj) => {
  axios.post(`${API_URL_SERVICE}/${id}`, obj);
};
const createReqService = (obj) => {
  axios.post(`${API_URL_MESSAGES}/to/${ADMIN}`, obj);
};
const createMessage = (obj, to) => {
  axios.post(`${API_URL_MESSAGES}/to/${to}`, obj);
};
const createMessageToAdmin = (obj) => {
  axios.post(`${API_URL_MESSAGES}/to/${ADMIN}`, obj);
};
const deleteUser = (id) => {
  axios.delete(`${API_URL_USER}/${id}`);
};
const deleteService = (id) => {
  axios.delete(`${API_URL_SERVICE}/${id}`);
};
const deleteCar = (idCar, idUser) => {
  axios.delete(`${API_URL_CAR}/${idCar}/${idUser}`);
};
const getUserId = (id) => {
  return axios.get(`${API_URL_USER}/${id}`);
};
const getReviews = async () => {
  try {
    const data = await getAll(`${API_URL_REVIEWS}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    throw error; // ניתן לזרוק את השגיאה כדי לטפל בה במקום אחר
  }
};
const getContacts =async () => {
  const { data } = await getAll(`${API_URL_CONTACTS}`);
  return data;
};

const createContact = (obj) => {
  axios.post(`${API_URL_CONTACTS}`, obj);
};
const getUsers = async () => {
  const { data } = await getAll(`${API_URL_USER}`);

  return data;
};

const getServices = async () => {
  const { data } = await getAll(`${API_URL_SERVICE}`);

  return data;
};

const getCars = async () => {
  const { data } = await getAll(`${API_URL_CAR}`);

  return data;
};

const getCarsByType = async () => {
  const { data } = await axios.get(`${API_URL_CAR}/populate?populate=owner`);

  return data;
};

const getServicesByType = async () => {
  const { data } = await axios.get(`${API_URL_SERVICE}/populate?populate=car`);

  return data;
};

const getMessagesContact = async () => {
  const { data } = await getAll(`${API_URL_CONTACTS}`);

  return data;
};
const getMessages = async () => {
  const { data } = await getAll(`${API_URL_MESSAGES}`);

  return data;
};

const deleteMessage = async (id) => {
  const { data } = await axios.delete(`${API_URL_MESSAGES}/${id}`);

  return data;
};

const deleteContact = (id) => {
  axios.delete(`${API_URL_CONTACTS}/${id}`);
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(updatedAt);
  const now = new Date();
  const secondsAgo = Math.floor((now - date) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(monthsAgo / 12);

  const month = date.getMonth() + 1;
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formatted24Hours = hours % 24;

  let timeAgo;
  if (secondsAgo < 60) {
    timeAgo = `${secondsAgo} seconds`;
  } else if (minutesAgo < 60) {
    timeAgo = `${minutesAgo} minutes`;
  } else if (hoursAgo < 24) {
    timeAgo = `${hoursAgo} hours`;
  } else if (daysAgo < 30) {
    timeAgo = `${daysAgo} days`;
  } else if (monthsAgo < 12) {
    timeAgo = `${monthsAgo} months`;
  } else {
    timeAgo = `${yearsAgo} years`;
  }
  const theDate = `${day}/${month}/${year}`;
  const theTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}${ampm}`;
  const theTimeAgo = `${timeAgo} ago`;
  return { theDate, theTime, theTimeAgo, monthName };
}
