import Car from "../models/Car.js";
import User from "../models/User.js";
import { templateCar } from "../utils/templates.js";

//test create Car

const createCar = async (req) => {
  const userId = req.params.userId;
  const { numberPlate } = req.body;
  const newNumberPlate = templateCar(numberPlate);
  console.log(newNumberPlate);
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
  const updatedCar = await Car.findByIdAndUpdate(
    req.params.id,
    {
      $set: { ...req.body },
    },
    { new: true }
  );
  return updatedCar;
};

const deleteCar = async (req) => {
  const userId = req.params.userId;
  await Car.findByIdAndDelete(req.params.id);
  await User.findByIdAndUpdate(userId, {
    $pull: { cars: req.params.id },
  });
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
