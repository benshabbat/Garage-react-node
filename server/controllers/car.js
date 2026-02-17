import carService from "../services/carService.js";
import { createHandler } from "../utils/controllerFactory.js";

// Create car handler
export const createCar = createHandler(carService.createCar, 201);

// Update car handler
export const updateCar = createHandler(carService.updateCar, 200);

// Delete car handler with custom message
export const deleteCar = createHandler(
  carService.deleteCar,
  200,
  "The Car has been removed"
);

// Get single car handler
export const getCar = createHandler(carService.getCar, 200);

// Get all cars handler
export const getCars = createHandler(carService.getCars, 200);

// Get cars by type handler
export const getCarsByType = createHandler(carService.getCarsByType, 200);

// Get cars with service handler
export const getCarsWithService = createHandler(carService.getCarsWithService, 200);

// Get cars by owner handler
export const getCarsByOwner = createHandler(carService.getCarsByOwner, 200);
