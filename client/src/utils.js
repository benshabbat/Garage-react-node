import axios from "./axiosConfig.js";
export const API_URL_CAR = "/cars";
export const API_URL_USER = "/users";
export const API_URL_SERVICE = "/services";
export const API_URL_MESSAGES = "/messages";
export const API_URL_REGISTER = "/auth/register";
export const API_URL_REVIEWS = "/reviews";
export const API_URL_CONTACTS = "/contacts";
export const ADMIN = "63e14deca4340e45d23f20b2";
const getAll = (url) => {
  axios.get(url);
};
const getUsersLocal = () => {
  return axios.get(API_URL_USER);
};
const getById = (url, id) => {
  axios.get(`${url}/${id}`);
};
const addItem = (url, obj) => {
  axios.post(url, obj);
};
const createUser = (obj) => {
  axios.post(API_URL_REGISTER, obj);
};
const updateUser = (id, obj) => {
  axios.put(`${API_URL_USER}/${id}`, obj);
};
const updateService = (id, obj) => {
  axios.put(`${API_URL_SERVICE}/${id}`, obj);
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
const deleteMessage = (id) => {
  axios.delete(`${API_URL_MESSAGES}/${id}`);
};
const getUserId = (id) => {
  return axios.get(`${API_URL_USER}/${id}`);
};
const getReviews = () => {
  return axios.get(`${API_URL_REVIEWS}`);
};
const getContacts = () => {
  return axios.get(`${API_URL_CONTACTS}`);
};
const deleteContact = (id) => {
  axios.delete(`${API_URL_CONTACTS}/${id}`);
};
const createContact = (obj) => {
  axios.post(`${API_URL_CONTACTS}`, obj);
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
  getUsersLocal
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
