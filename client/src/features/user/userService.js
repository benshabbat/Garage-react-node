import axios from "axios";

const API_URL_USER = "/users";
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
  const { data } = await axios.get(`${API_URL_USER}/${id}`);

  return data;
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
