import axios from "../../axiosConfig.js";
import { ADMIN, API_URL_MESSAGES, API_URL_SERVICE, API_URL_USER } from "../../utils.js";

const createReqService = async (dataMessage) => {
  const { data } = await axios.post(
    `${API_URL_MESSAGES}/to/${ADMIN}`,
    dataMessage
  );

  return data;
};
// get user by _id

const getUser = async (id) => {
  const { data } = await axios.get(`${API_URL_USER}/${id}`);

  return data;
};

const getServicesByIdCar = async (carId) => {
  const { data } = await axios.get(`${API_URL_SERVICE}/car/${carId}`);

  return data;
};
const getServicesByIdUser = async (userId) => {
  const { data } = await axios.get(`${API_URL_SERVICE}/user/${userId}`);

  return data;
};
const getMessagesByIdUser = async (userId) => {
  const { data } = await axios.get(`${API_URL_MESSAGES}/user/${userId}`);

  for (let index = 0; index < data.length; index++) {
    const dateArray = data[index].updatedAt.slice(0, 10).split("-");
    const [year, month, day] = dateArray;
    data[index].updatedAt = `${day}/${month}/${year}`;
  }

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
