import axios from "../../axiosConfig.js";
import { getUserId } from "../../utils.js";

const API_URL_CAR = "/cars";
const API_URL_SERVICES = "/services";
const API_URL_MESSAGES = "/messages";
const ADMIN = "63e14deca4340e45d23f20b2";

const createReqService = async (dataMessage) => {
  const { data } = await axios.post(
    `${API_URL_MESSAGES}/to/${ADMIN}`,
    dataMessage
  );

  return data;
};
// get user by _id

const getUser = async (id) => {
  return await getUserId(id);
};

const getServicesByIdCar = async (carId) => {
  const { data } = await axios.get(`${API_URL_SERVICES}/car/${carId}`);

  return data;
};
const getServicesByIdUser = async (userId) => {
  const { data } = await axios.get(`${API_URL_SERVICES}/user/${userId}`);

  return data;
};
const getMessagesByIdUser = async (userId) => {
  const { data } = await axios.get(`${API_URL_MESSAGES}/user/${userId}`);
  return data;
};
const getCarsByIdUser = async (userId) => {
  const { data } = await axios.get(`${API_URL_CAR}/user/${userId}`);

  return data;
};
const userService = {
  getUser,
  getServicesByIdCar,
  getServicesByIdUser,
  createReqService,
  getMessagesByIdUser,
  getCarsByIdUser,
};

export default userService;
