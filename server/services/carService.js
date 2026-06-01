import Car from "../models/Car.js";
import User from "../models/User.js";
import { templateCar } from "../utils/templates.js";
import { createError } from "../utils/error.js";

const ALLOWED_CAR_POPULATE_FIELDS = ['services', 'owner'];
const ALLOWED_CAR_UPDATE_FIELDS = ['numberPlate', 'km', 'brand'];

const createCar = async (req) => {
  const userId = req.params.userId;
  const { numberPlate } = req.body;
  const newNumberPlate = templateCar(numberPlate);
  const newCar = new Car({
    ...req.body,
    owner: userId,
    numberPlate: newNumberPlate,
  });
  const savedCar = await newCar.save();
  await User.findByIdAndUpdate(userId, {
    $push: { cars: [savedCar._id] },
  });
  return savedCar;
};

const updateCar = async (req) => {
  const safeBody = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => ALLOWED_CAR_UPDATE_FIELDS.includes(key))
  );
  if (safeBody.numberPlate) {
    safeBody.numberPlate = templateCar(safeBody.numberPlate);
  }
  const updatedCar = await Car.findByIdAndUpdate(
    req.params.id,
    { $set: safeBody },
    { new: true }
  );
  if (!updatedCar) throw createError(404, "Car not found");
  return updatedCar;
};

const deleteCar = async (req) => {
  const { id, userId } = req.params;
  const car = await Car.findById(id);
  if (!car) throw createError(404, "Car not found");
  if (car.owner.toString() !== userId) {
    throw createError(403, "Car does not belong to this user");
  }
  await Promise.all([
    Car.findByIdAndDelete(id),
    User.findByIdAndUpdate(userId, { $pull: { cars: id } }),
  ]);
  return "The Car has been removed";
};
const getCar = async (req) => {
  const car = await Car.findById(req.params.id).populate("services");
  return car;
};

const getCars = async () => {
  const cars = await Car.find().populate("owner");
  return cars;
};

const getCarsByType = async (req) => {
  const type = req.query.populate;
  if (!ALLOWED_CAR_POPULATE_FIELDS.includes(type)) {
    throw createError(400, `Invalid populate field. Allowed: ${ALLOWED_CAR_POPULATE_FIELDS.join(', ')}`);
  }
  const cars = await Car.find().populate(type);
  return cars;
};

const getCarsWithService = async () => {
  const cars = await Car.find().populate("services");
  return cars;
};

const getCarsByOwner = async (req) => {
  const cars = await Car.find({ owner: req.params.user }).populate(
    "services"
  );
  return cars;
};

const carService = {
  createCar,
  updateCar,
  deleteCar,
  getCar,
  getCars,
  getCarsByType,
  getCarsWithService,
  getCarsByOwner,
};

export default carService;
