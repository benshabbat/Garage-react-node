import authService from "../services/authService.js";

export const register = async (req, res, next) => {
  try {
    const data = await authService.register(req);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req, res, next);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

//logout
export const logout = async (req, res) => {
  await authService.logout(req, res);
};
