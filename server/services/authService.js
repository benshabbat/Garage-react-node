import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { templatePhone } from "../utils/templates.js";

const register = async (req) => {
  try {
    const { username, phone, email, password } = req.body;

    // Input validation
    if (!username || !phone || !email || !password) {
      throw createError(400, "All fields are required");
    }
    // Check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) throw createError(400, "User already exists");

    // Check if email is already in use
    const emailExists = await User.findOne({ email });
    if (emailExists) throw createError(400, "Email already in use");

    const newNumberPlate = templatePhone(phone);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      phone: newNumberPlate,
      password: hashedPassword,
    });

    // Return user info without password
    return {
      _id: newUser._id,
      username: newUser.username,
      phone: newUser.phone,
      email: newUser.email,
    };
  } catch (error) {
    // Pass error up the chain
    throw error;
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return next(createError(404, "User not found!"));
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) return next(createError(400, "Wrong password!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    // res.cookie("access_token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    //   path: '/'
    // })
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        domain: "garage-server-dcv1.onrender.com",
      })

      .json({
        _id: user.id,
        isAdmin: user.isAdmin,
      });
  } catch (error) {
    next(error);
  }
};

//logout
const logout = async (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
