import Service from "../models/Service.js";
import Car from "../models/Car.js";

//test create user
const createService = async (req) => {
  const carId = req.params.carId;
  const newService = new Service({ ...req.body, car: carId });
  try {
    const savedService = await newService.save();
    try {
      await Car.findByIdAndUpdate(carId, {
        $push: { services: [savedService._id] },
      });
    } catch (error) {
      throw Error(error);
    }
    return savedService;
  } catch (error) {
    throw Error(error);
  }
};

const updateService = async (req) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return updatedService;
  } catch (error) {
    throw Error(error);
  }
};
const deleteService = async (req) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
  } catch (error) {
    throw Error(error);
  }
};
const getService = async (req) => {
  try {
    const service = await Service.findById(req.params.id);
    return service;
  } catch (error) {
    throw Error(error);
  }
};
const getServices = async () => {
  try {
    const services = await Service.find().populate("car");
    return services;
  } catch (error) {
    throw Error(error);
  }
};
const getServicesByType = async (req) => {
  const type = req.query.populate;
  try {
    const services = await Service.find().populate(type);
    return services;
  } catch (error) {
    throw Error(error);
  }
};

const getServicesByCar = async (req) => {
  try {
    const services = await Service.find({ car: req.params.car });
    return services;
  } catch (error) {
    throw Error(error);
  }
};
const getServicesByUser = async (req) => {
  try {
    const services = await Service.find({ owner: req.params.user });
    return services;
  } catch (error) {
    throw Error(error);
  }
};

const serviceService = {
  createService,
  updateService,
  deleteService,
  getService,
  getServices,
  getServicesByType,
  getServicesByCar,
  getServicesByUser,
};

export default serviceService;
