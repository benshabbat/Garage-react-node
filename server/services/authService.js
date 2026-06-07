import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { templatePhone } from "../utils/templates.js";

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;
const isProd = () => process.env.NODE_ENV === "production";

/**
 * Builds cookie options shared by login and logout.
 * @param {boolean} withMaxAge - include maxAge (true for login, false for logout)
 */
const buildCookieOptions = (withMaxAge = false) => {
  const options = {
    httpOnly: true,
    secure: isProd(),
    sameSite: isProd() ? "none" : "lax",
    path: "/",
    ...(withMaxAge && { maxAge: 24 * 60 * 60 * 1000 }),
  };
  if (isProd()) options.domain = COOKIE_DOMAIN;
  return options;
};

const register = async (req) => {
  const username = req.body.username?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const phone = req.body.phone?.trim();
  const { password } = req.body;

  // Input validation
  if (!username || !phone || !email || !password) {
    throw createError(400, "All fields are required");
  }

  // Password complexity: min 8 chars, at least one uppercase letter and one digit
  const passwordPolicy = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordPolicy.test(password)) {
    throw createError(400, "Password must be at least 8 characters and include at least one uppercase letter and one number");
  }

  // Check uniqueness of username, email, and phone
  const [userExists, emailExists, phoneExists] = await Promise.all([
    User.findOne({ username }),
    User.findOne({ email }),
    User.findOne({ phone: templatePhone(phone) }),
  ]);
  if (userExists)  throw createError(400, "Username already in use");
  if (emailExists) throw createError(400, "Email already in use");
  if (phoneExists) throw createError(400, "Phone number already in use");

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
};

const login = async (req) => {
  const username = req.body.username?.trim();
  const { password } = req.body;

  if (!username || !password) {
    throw createError(400, "Username and password are required");
  }

  const user = await User.findOne({ username });
  if (!user) throw createError(401, "Invalid credentials");

  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) throw createError(401, "Invalid credentials");

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT,
    { expiresIn: "24h" }
  );

  const cookieOptions = buildCookieOptions(true);

  return {
    token,
    cookieOptions,
    user: {
      _id: user._id,
      isAdmin: user.isAdmin,
    },
  };
};

const logout = async () => {
  return {
    cookieOptions: buildCookieOptions(),
    message: "User has been logged out successfully",
  };
};

const getAdminId = async () => {
  const admin = await User.findOne({ isAdmin: true }, "_id");
  if (!admin) throw createError(404, "Admin user not found");
  return { adminId: admin._id };
};

const authService = {
  register,
  login,
  logout,
  getAdminId,
};

export default authService;
