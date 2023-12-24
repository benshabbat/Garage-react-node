import axios from "axios";

const API_URL_USER = "/users";
const API_URL_CAR = "/cars";
const API_URL_SERVICES = "/services";

// get users

const getUsers = async () => {
  const { data } = await axios.get(`${API_URL_USER}`);

  return data;
};
const getCars = async () => {
  const { data } = await axios.get(`${API_URL_CAR}`);

  return data;
};
const getCarsByType = async () => {
  const { data } = await axios.get(`${API_URL_CAR}/populate?populate=owner`);

  return data;
};

const getServices = async () => {
  const { data } = await axios.get(`${API_URL_SERVICES}`);

  return data;
};
const getServicesByType = async () => {
  const { data } = await axios.get(`${API_URL_SERVICES}/populate?populate=car`);

  return data;
};

const adminService = {
  getUsers,
  getServices,
  getCars,
  getCarsByType,
  getServicesByType,
};

export default adminService;
