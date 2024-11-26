import Car from "../models/Car.js";
import User from "../models/User.js";

//test create Car
function templateCar(car) {
  if (car.length === 8) {
    return car.slice(0, 3) + "-" + car.slice(3, 5) + "-" + car.slice(5);
  } else if (car.length === 7) {
    return car.slice(0, 2) + "-" + car.slice(2, 5) + "-" + car.slice(5);
  }
}
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
  try {
    const savedCar = await newCar.save();
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { cars: [savedCar._id] },
      });
    } catch (error) {
      throw Error(error);
    }
    return savedCar;
  } catch (error) {
    throw Error(error);
  }
};

const updateCar = async (req) => {
  const { numberPlate } = req.body;
  const newNumberPlate = templateCar(numberPlate);
  console.log(newNumberPlate);
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body, numberPlate: newNumberPlate },
      },
      { new: true }
    );
    return updatedCar;
  } catch (error) {
    throw Error(error);
  }
};
const deleteCar = async (req) => {
  const userId = req.params.userId;
  try {
    await Car.findByIdAndDelete(req.params.id);
    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { cars: req.params.id },
      });
    } catch (error) {
      throw Error(error);
    }
    return "The Car has been removed";
  } catch (error) {
    throw Error(error);
  }
};
const getCar = async (req) => {
  try {
    const car = await Car.findById(req.params.id).populate("services");
    return car;
  } catch (error) {
    throw Error(error);
  }
};
const getCars = async () => {
  try {
    const cars = await Car.find().populate("owner");
    return cars;
  } catch (error) {
    throw Error(error);
  }
};
const getCarsByType = async (req) => {
  const type = req.query.populate;
  try {
    const cars = await Car.find().populate(type);
    return cars;
  } catch (error) {
    throw Error(error);
  }
};
const getCarsWithService = async () => {
  try {
    const cars = await Car.find().populate("services");
    return cars;
  } catch (error) {
    throw Error(error);
  }
};
const getCarsByOwner = async (req) => {
  try {
    const cars = await Car.find({ owner: req.params.user }).populate(
      "services"
    );
    return cars;
  } catch (error) {
    throw Error(error);
  }
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
