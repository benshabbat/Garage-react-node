import authService from "../services/authService.js";
import { createHandler } from "../utils/controllerFactory.js";

// Register handler using shared factory
export const register = createHandler(authService.register, 201);

// Login has custom cookie handling, keep it as-is
export const login = async (req, res, next) => {
  try {
    const { token, cookieOptions, user } = await authService.login(req);
    res.cookie("access_token", token, cookieOptions);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Logout has custom cookie clearing, keep it as-is
export const logout = async (req, res, next) => {
  try {
    const { cookieOptions, message } = await authService.logout();
    res.clearCookie("access_token", cookieOptions);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};