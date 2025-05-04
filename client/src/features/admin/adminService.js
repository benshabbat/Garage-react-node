import {
  deleteMessage,
  getCars,
  getCarsByType,
  getMessages,
  getMessagesContact,
  getServices,
  getServicesByType,
  getUsers,
} from "../../utils";

const adminService = {
  getUsers,
  getServices,
  getCars,
  getCarsByType,
  getServicesByType,
  getMessages,
  getMessagesContact,
  deleteMessage,
};

export default adminService;
