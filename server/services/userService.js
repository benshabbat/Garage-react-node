import User from "../models/User.js";
import bcrypt from "bcryptjs";


function templatePhone(phone) {
  if (phone.length === 10) {
    phone = phone.slice(0, 3) + "-" + phone.slice(3, 10);
  }
  return phone;
}

const createUser = async (req) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw Error(error);
  }
};
const updateUser = async (req) => {
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // const user = await User.findById(req.params.id)
  const {phone}=req.body;
  const newPhone = templatePhone(phone)
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,

      {
        $set: { ...req.body, phone:newPhone, password: hashedPassword },
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
    return await User.findByIdAndDelete(req.params.id);
  } catch (error) {
    throw Error(error);
  }
};
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
  createUser,
  getUsersByType,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};

export default userService;
