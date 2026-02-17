import User from "../models/User.js";
import Car from "../models/Car.js";
import Message from "../models/Message.js";
import bcrypt from "bcryptjs";
import { templatePhone } from "../utils/templates.js";

const updateUser = async (req) => {
  const { password, phone } = req.body;
  const user = await User.findById(req.params.id);

  // Process phone number if provided
  const newPhone = phone ? templatePhone(phone) : user.phone;

  // Process password if provided
  let updatedPassword = user.password; // Default to keeping current password
  if (password) {
    const isMatchingPassword = await bcrypt.compare(password, user.password);
    if (!isMatchingPassword) {
      // Only hash if it's a new password
      const salt = await bcrypt.genSalt(10);
      updatedPassword = await bcrypt.hash(password, salt);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...req.body,
        phone: newPhone,
        password: updatedPassword,
      },
    },
    { new: true }
  );
  return updatedUser;
};

const deleteUser = async (req) => {
  await User.findByIdAndDelete(req.params.id);
  await Car.findOneAndDelete({ owner: req.params.id });
  await Message.findOneAndDelete({ from: req.params.id });
  await Message.findOneAndDelete({ to: req.params.id });
  return "the user has been removed";
};

const getUser = async (req) => {
  const user = await User.findById(req.params.id).populate("cars");
  return user;
};

const getUsers = async () => {
  const users = await User.find();
  return users;
};

const getUsersByType = async (req) => {
  const type = req.query.populate;
  const users = await User.find().populate(type);
  return users;
};

const userService = {
  getUsersByType,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};

export default userService;
