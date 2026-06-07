import authService from "../services/authService.js";
import { createHandler } from "../utils/controllerFactory.js";

// Register handler using shared factory
export const register = createHandler(authService.register, 201);

// Admin ID lookup — authenticated users only
export const getAdminId = createHandler(authService.getAdminId, 200);

// Login issues both access and refresh cookies
export const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, accessCookieOptions, refreshCookieOptions, user } =
      await authService.login(req);
    res.cookie("access_token", accessToken, accessCookieOptions);
    res.cookie("refresh_token", refreshToken, refreshCookieOptions);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Logout clears both cookies
export const logout = async (req, res, next) => {
  try {
    const { cookieOptions, message } = await authService.logout();
    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("refresh_token", cookieOptions);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

// Refresh validates the refresh cookie and issues a new access cookie
export const refresh = async (req, res, next) => {
  try {
    const { accessToken, accessCookieOptions } = await authService.refresh(req);
    res.cookie("access_token", accessToken, accessCookieOptions);
    res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    next(error);
  }
};
