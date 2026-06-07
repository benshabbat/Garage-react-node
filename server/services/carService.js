import Car from "../models/Car.js";
import User from "../models/User.js";
import Service from "../models/Service.js";
import { templateCar } from "../utils/templates.js";
import { createError } from "../utils/error.js";
import {
  getPaginationParams,
  pickAllowed,
  getPaginatedWithPopulate,
} from "../utils/queryHelpers.js";

const ALLOWED_CAR_POPULATE_FIELDS = ["services", "owner"];
const ALLOWED_CAR_UPDATE_FIELDS = ["numberPlate", "km", "brand"];
const ALLOWED_CAR_CREATE_FIELDS = ["numberPlate", "km", "brand"];

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
  if (safeBody.km !== undefined) {
    const existing = await Car.findById(req.params.id).select("km");
    if (!existing) throw createError(404, "Car not found");
    if (safeBody.km < existing.km) {
      throw createError(400, `km cannot be decreased (current: ${existing.km})`);
    }
  }
  const updatedCar = await Car.findByIdAndUpdate(req.params.id, { $set: safeBody }, { new: true });
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
    Service.deleteMany({ car: id }),
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
  const [cars, total] = await Promise.all([
    Car.find()
      .populate("owner")
      .skip((page - 1) * limit)
      .limit(limit),
    Car.countDocuments(),
  ]);
  return { data: cars, total, page, limit };
};

const getCarsByType = async (req) =>
  getPaginatedWithPopulate(Car, req, ALLOWED_CAR_POPULATE_FIELDS);

const getCarsWithService = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const [cars, total] = await Promise.all([
    Car.find().populate("services").skip((page - 1) * limit).limit(limit),
    Car.countDocuments(),
  ]);
  return { data: cars, total, page, limit };
};

const getCarsByOwner = async (req) => {
  const filter = { owner: req.params.user };
  const { limit, page } = getPaginationParams(req);
  const [cars, total] = await Promise.all([
    Car.find(filter).populate("services").skip((page - 1) * limit).limit(limit),
    Car.countDocuments(filter),
  ]);
  return { data: cars, total, page, limit };
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
