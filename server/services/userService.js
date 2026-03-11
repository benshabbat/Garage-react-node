import User from "../models/User.js";
import Car from "../models/Car.js";
import Message from "../models/Message.js";
import bcrypt from "bcryptjs";
import { templatePhone } from "../utils/templates.js";
import { createError } from "../utils/error.js";

const ALLOWED_POPULATE_FIELDS = ['cars', 'messages'];

const ALLOWED_UPDATE_FIELDS = ['username', 'email', 'phone', 'isAdmin', 'password'];

const updateUser = async (req) => {
  const { password, phone } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) throw createError(404, "User not found");

  // Only pick allowed fields from the request body
  const safeBody = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => ALLOWED_UPDATE_FIELDS.includes(key))
  );

  // Process phone number if provided
  const newPhone = phone ? templatePhone(phone) : user.phone;

  // Process password: only hash if a new (different) password is provided
  let updatedPassword = user.password;
  if (password) {
    const isMatchingPassword = await bcrypt.compare(password, user.password);
    if (!isMatchingPassword) {
      const salt = await bcrypt.genSalt(10);
      updatedPassword = await bcrypt.hash(password, salt);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...safeBody,
        phone: newPhone,
        password: updatedPassword,
      },
    },
    { new: true }
  ).select("-password");
  return updatedUser;
};

const deleteUser = async (req) => {
  const { id } = req.params;
  await Promise.all([
    User.findByIdAndDelete(id),
    Car.deleteMany({ owner: id }),
    Message.deleteMany({ $or: [{ from: id }, { to: id }] }),
  ]);
  return "the user has been removed";
};

const getUser = async (req) => {
  const user = await User.findById(req.params.id).select("-password").populate("cars");
  return user;
};

const getUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

const getUsersByType = async (req) => {
  const type = req.query.populate;
  if (!ALLOWED_POPULATE_FIELDS.includes(type)) {
    throw createError(400, `Invalid populate field. Allowed: ${ALLOWED_POPULATE_FIELDS.join(', ')}`);
  }
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
