import userService from "../services/userService.js";
import { createHandler, createHandlerWithCheck } from "../utils/controllerFactory.js";

// Create user handler
export const createUser = createHandler(userService.createUser, 201);

// Update user handler
export const updateUser = createHandler(userService.updateUser, 200);

// Delete user handler with custom message
export const deleteUser = createHandler(
  userService.deleteUser, 
  200, 
  "The User has been removed"
);

// Get user handler with 404 check
export const getUser = createHandlerWithCheck(
  userService.getUser,
  (user) => !user ? { status: 404, message: "User not found" } : null,
  200
);

// Get all users handler
export const getUsers = createHandler(userService.getUsers, 200);

// Get users by type handler
export const getUsersByType = createHandler(userService.getUsersByType, 200);
