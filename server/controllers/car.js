import carService from "../services/carService.js";

//test create Car
// 
export const createCar = async (req, res, next) => {
  try {
    const savedCar = await carService.createCar(req);
    res.status(200).json(savedCar);
  } catch (err) {
    next(err);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    const updatedCar = await carService.updateCar(req);
    res.status(200).json(updatedCar);
  } catch (error) {
    next(error);
  }
};
export const deleteCar = async (req, res, next) => {
  try {
    await carService.deleteCar(req);
    res.status(200).json("The Car has been removed");
  } catch (error) {
    next(error);
  }
};
export const getCar = async (req, res, next) => {
  try {
    const car = await carService.getCar(req);
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};
export const getCars = async (req, res, next) => {
  try {
    const cars = await carService.getCars();
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
export const getCarsByType = async (req, res, next) => {
  try {
    const cars = await carService.getCarsByType(req);
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
export const getCarsWithService = async (req, res, next) => {
  try {
    const cars = await carService.getCarsWithService();
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
export const getCarsByOwner = async (req, res, next) => {
  try {
    const cars = await carService.getCarsByOwner(req);
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
