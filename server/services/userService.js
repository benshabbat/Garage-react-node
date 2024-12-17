import User from "../models/User.js";
import Car from "../models/Car.js";
import Message from "../models/Message.js";
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
  const { phone } = req.body;
  const newPhone = templatePhone(phone);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,

      {
        $set: { ...req.body, phone: newPhone, password: hashedPassword },
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


const getUser = async (req, res) => {  // שים לב שהוספתי את פרמטר res
  try {
    console.log("Getting user with ID:", req.params.id);
    console.log("Request headers:", req.headers);  // לבדיקת ה-token
    
    const user = await User.findById(req.params.id).populate("cars");
    
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);
    
    return res.status(200).json(user);
    
  } catch (error) {
    console.error("Error in getUser:", error);
    return res.status(500).json({ 
      message: "Error getting user",
      error: error.message 
    });
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
