import axios from "axios";
const API_URL_CAR = "/cars";
const API_URL_USER = "/users";
const API_URL_SERVICE = "/services";
const API_URL_MESSAGES = "/messages"
const API_URL_REGISTER = "/auth/register";
const API_URL_REVIEWS = "/reviews";
const ADMIN = "63e14deca4340e45d23f20b2"
const getAll = (url) => {
  axios.get(url);
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
const createReview= (obj) => {
  axios.post(`${API_URL_REVIEWS}`, obj);
};
const createService = (id, obj) => {
  axios.post(`${API_URL_SERVICE}/${id}`, obj);
};
const createReqService = (obj) => {
  axios.post(`${API_URL_MESSAGES}/to/${ADMIN}`, obj);
};
const createMessage = (obj,to) => {
  axios.post(`${API_URL_MESSAGES}/to/${to}`, obj);
};
const createMessageToAdmin = (obj) => {
  axios.post(`${API_URL_MESSAGES}/to/${ADMIN}`, obj);
};
const deleteUser= (id) => {
  axios.delete(`${API_URL_USER}/${id}`);
};
const deleteService= (id) => {
  axios.delete(`${API_URL_SERVICE}/${id}`);
};
const deleteCar= (idCar ,idUser) => {
  axios.delete(`${API_URL_CAR}/${idCar}/${idUser}`);
};
const getUser = (id) => {
  return axios.get(`${API_URL_USER}/${id}`);
};
const getReviews = () => {
  return axios.get(`${API_URL_REVIEWS}`);
};

export {createReview,getReviews,createMessageToAdmin,createMessage,createService,createUser,createReqService,updateService, getAll, getById, addItem, updateUser, deleteUser, createCar, getUser,deleteCar,updateCar,deleteService };
