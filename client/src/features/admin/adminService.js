import axios from "axios";
import { API_URL_CAR, API_URL_CONTACTS, API_URL_MESSAGES, API_URL_SERVICE, API_URL_USER, getAll } from "../../utils";

// get users

const getUsers = async () => {
  const { data } = await getAll(`${API_URL_USER}`);

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

const getServices = async () => {
  const { data } = await getAll(`${API_URL_SERVICE}`);

  return data;
};
const getServicesByType = async () => {
  const { data } = await axios.get(`${API_URL_SERVICE}/populate?populate=car`);

  return data;
};

const getMessagesContact = async () => {
  const { data } = await getAll(`${API_URL_CONTACTS}`);

  return data;
}
const getMessages = async () => {
  const { data } = await getAll(`${API_URL_MESSAGES}`);

  return data;
};
const deleteMessage = async (id) => {
  const { data } = await axios.delete(`${API_URL_MESSAGES}/${id}`);

  return data;
};
const deleteMessageContact = async (id) => {
  const { data } = await axios.delete(`${API_URL_CONTACTS}/${id}`);

  return data;
};


const adminService = {
  getUsers,
  getServices,
  getCars,
  getCarsByType,
  getServicesByType,
  getMessages,
  getMessagesContact,
  deleteMessage,
  deleteMessageContact,
};

export default adminService;
