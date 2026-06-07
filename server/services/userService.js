import User from "../models/User.js";
import Car from "../models/Car.js";
import Message from "../models/Message.js";
import Service from "../models/Service.js";
import bcrypt from "bcryptjs";
import { templatePhone } from "../utils/templates.js";
import { createError } from "../utils/error.js";
import {
  getPaginationParams,
  pickAllowed,
  getPaginatedWithPopulate,
} from "../utils/queryHelpers.js";

const ALLOWED_POPULATE_FIELDS = ["cars", "messages"];

const ALLOWED_UPDATE_FIELDS = ["username", "email", "phone", "isAdmin", "password"];

const updateUser = async (req) => {
  const { password, phone } = req.body;
  const { username, email } = req.body;
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) throw createError(404, "User not found");

  // Check uniqueness for fields being changed
  if (username && username !== user.username) {
    const taken = await User.findOne({ username, _id: { $ne: userId } });
    if (taken) throw createError(400, "Username already in use");
  }
  if (email && email !== user.email) {
    const taken = await User.findOne({ email, _id: { $ne: userId } });
    if (taken) throw createError(400, "Email already in use");
  }
  if (phone) {
    const formattedPhone = templatePhone(phone);
    if (formattedPhone !== user.phone) {
      const taken = await User.findOne({ phone: formattedPhone, _id: { $ne: userId } });
      if (taken) throw createError(400, "Phone number already in use");
    }
  }

  // Only pick allowed fields from the request body
  const safeBody = pickAllowed(req.body, ALLOWED_UPDATE_FIELDS);

  // Process phone number if provided
  const newPhone = phone ? templatePhone(phone) : user.phone;

  // Process password: require current password before allowing a change
  let updatedPassword = user.password;
  if (password) {
    if (!req.body.currentPassword)
      throw createError(400, "Current password is required to set a new password");
    const isCurrentValid = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!isCurrentValid) throw createError(401, "Current password is incorrect");
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
  const cars = await Car.find({ owner: id }).select("_id").lean();
  const carIds = cars.map((c) => c._id);
  await Promise.all([
    User.findByIdAndDelete(id),
    Car.deleteMany({ owner: id }),
    Message.deleteMany({ $or: [{ from: id }, { to: id }] }),
    ...(carIds.length ? [Service.deleteMany({ car: { $in: carIds } })] : []),
  ]);
  return "the user has been removed";
};

const getUser = async (req) => {
  const user = await User.findById(req.params.id).select("-password").populate("cars");
  if (!user) throw createError(404, "User not found");
  return user;
};

const getUsers = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const [users, total] = await Promise.all([
    User.find()
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit),
    User.countDocuments(),
  ]);
  return { data: users, total, page, limit };
};

const getUsersByType = async (req) =>
  getPaginatedWithPopulate(User, req, ALLOWED_POPULATE_FIELDS, { selectFields: "-password" });

const userService = {
  getUsersByType,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};

export default userService;
