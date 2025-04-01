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

    if (!username || !password) {
      throw createError(400, "Username and password are required");
    }

    const user = await User.findOne({ username });
    if (!user) throw createError(404, "User not found");

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) throw createError(400, "Wrong password");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: "24h" }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    };

    if (process.env.NODE_ENV === "production") {
      cookieOptions.domain =
        process.env.COOKIE_DOMAIN || "garage-server-dcv1.onrender.com";
    }

    res.cookie("access_token", token, cookieOptions);

    res.status(200).json({
      _id: user._id,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    next(error); // מעביר את השגיאה ל-error handler
  }
};

//logout
const logout = async (req, res) => {
  try {
    // Use same cookie settings as login
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    };

    if (process.env.NODE_ENV === "production") {
      cookieOptions.domain =
        process.env.COOKIE_DOMAIN || "garage-server-dcv1.onrender.com";
    }

    // Clear cookie
    res.clearCookie("access_token", cookieOptions);
    return { message: "User has been logged out successfully" };
  } catch (error) {
    throw error;
  }
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
