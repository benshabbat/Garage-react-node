import User from "../models/User.js";
import Car from "../models/Car.js";
import Message from "../models/Message.js";
import bcrypt from "bcryptjs";
import { templatePhone } from "../utils/templates.js";

const updateUser = async (req) => {
  const { password } = req.body;
  const user = await User.findById(req.params.id);
  // Hash password
  const isPassword = await bcrypt.compare(password, user.password);
  const { phone } = req.body;
  const newPhone = templatePhone(phone);
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
          phone: newPhone,
          password: isPassword ? password : hashpassword,
        },
      },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw Error(error);
  }
};
const deleteUser = async (req) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Car.findOneAndDelete({ owner: req.params.id });
    await Message.findOneAndDelete({ from: req.params.id });
    await Message.findOneAndDelete({ to: req.params.id });
    return "the user has been removed";
  } catch (error) {
    throw Error(error);
  }
};
// const getUser = async (req) => {
//   try {
//     const user = await User.findById(req.params.id).populate("cars");
//     return user;
//   } catch (error) {
//     throw Error(error);
//   }
// };

const getUser = async (req) => {
  try {
    const user = await User.findById(req.params.id).populate("cars");
    return user;
  } catch (error) {
    throw Error(error);
  }
};
const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw Error(error);
  }
};
const getUsersByType = async (req) => {
  const type = req.query.populate;
  try {
    const users = await User.find().populate(type);
    return users;
  } catch (error) {
    throw Error(error);
  }
};

const userService = {
  getUsersByType,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};

export default userService;
