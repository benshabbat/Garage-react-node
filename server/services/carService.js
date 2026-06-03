import Car from "../models/Car.js";
import User from "../models/User.js";
import { templateCar } from "../utils/templates.js";
import { createError } from "../utils/error.js";
import { getPaginationParams, pickAllowed } from "../utils/queryHelpers.js";

const ALLOWED_CAR_POPULATE_FIELDS = ['services', 'owner'];
const ALLOWED_CAR_UPDATE_FIELDS = ['numberPlate', 'km', 'brand'];
const ALLOWED_CAR_CREATE_FIELDS = ['numberPlate', 'km', 'brand'];

const createCar = async (req) => {
  const userId = req.params.userId;
  const safeBody = pickAllowed(req.body, ALLOWED_CAR_CREATE_FIELDS);
  const newNumberPlate = templateCar(safeBody.numberPlate);
  const newCar = new Car({
    ...safeBody,
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
  const safeBody = pickAllowed(req.body, ALLOWED_CAR_UPDATE_FIELDS);
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
  if (!car) throw createError(404, "Car not found");
  return car;
};

const getCars = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const cars = await Car.find().populate("owner").skip((page - 1) * limit).limit(limit);
  return cars;
};

const getCarsByType = async (req) => {
  const type = req.query.populate;
  if (!ALLOWED_CAR_POPULATE_FIELDS.includes(type)) {
    throw createError(400, `Invalid populate field. Allowed: ${ALLOWED_CAR_POPULATE_FIELDS.join(', ')}`);
  }
  const { limit, page } = getPaginationParams(req);
  const cars = await Car.find().populate(type).skip((page - 1) * limit).limit(limit);
  return cars;
};

const getCarsWithService = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const cars = await Car.find().populate("services").skip((page - 1) * limit).limit(limit);
  return cars;
};

const getCarsByOwner = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const cars = await Car.find({ owner: req.params.user })
    .populate("services")
    .skip((page - 1) * limit)
    .limit(limit);
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
