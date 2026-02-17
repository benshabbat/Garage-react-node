import authService from "../services/authService.js";

export const register = async (req, res, next) => {
  try {
    const data = await authService.register(req);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token, cookieOptions, user } = await authService.login(req);
    res.cookie("access_token", token, cookieOptions);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { cookieOptions, message } = await authService.logout();
    res.clearCookie("access_token", cookieOptions);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};