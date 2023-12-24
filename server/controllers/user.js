// import User from "../models/User.js";
import userService from "../services/userService.js";

//test create user
export const createUser = async (req, res, next) => {
  try {
    const savedUser = await userService.createUser(req);
    res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req);
    res.status(200).json("The User has been removed");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
export const getUsersByType = async (req, res, next) => {
  try {
    const users = await userService.getUsersByType(req);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
