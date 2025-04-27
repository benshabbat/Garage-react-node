import {
  deleteMessage,
  deleteMessageContact,
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
  deleteMessageContact,
};

export default adminService;
