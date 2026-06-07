import Service from "../models/Service.js";
import Car from "../models/Car.js";
import { createError } from "../utils/error.js";
import { getPaginationParams, pickAllowed, getPaginatedWithPopulate } from "../utils/queryHelpers.js";

const ALLOWED_SERVICE_POPULATE_FIELDS = ['car'];
const ALLOWED_SERVICE_UPDATE_FIELDS = ['title', 'description', 'price', 'paid', 'status'];
const ALLOWED_SERVICE_CREATE_FIELDS = ['title', 'description', 'price', 'paid', 'status'];

const createService = async (req) => {
  const carId = req.params.carId;
  const safeBody = pickAllowed(req.body, ALLOWED_SERVICE_CREATE_FIELDS);
  const newService = new Service({ ...safeBody, car: carId });
  
  try {
    const savedService = await newService.save();

    try {
      await Car.findByIdAndUpdate(carId, {
        $push: { services: savedService._id },
      });
    } catch (error) {
      await Service.findByIdAndDelete(savedService._id);
      throw createError(500, `Failed to update car with service: ${error.message}`);
    }

    return savedService;
  } catch (error) {
    if (error.status) throw error; // already a createError
    if (error.code === 11000) {
      throw createError(400, "Duplicate service entry");
    }
    throw createError(500, `Failed to create service: ${error.message}`);
  }
};

const updateService = async (req) => {
  const safeBody = pickAllowed(req.body, ALLOWED_SERVICE_UPDATE_FIELDS);
  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    { $set: safeBody },
    { new: true }
  );
  if (!updatedService) throw createError(404, "Service not found");
  return updatedService;
};

const deleteService = async (req) => {
  const deleted = await Service.findByIdAndDelete(req.params.id);
  if (!deleted) throw createError(404, "Service not found");
  await Car.findByIdAndUpdate(deleted.car, { $pull: { services: deleted._id } });
  return "The Service has been removed";
};

const getService = async (req) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw createError(404, "Service not found");
  return service;
};

const getServices = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const services = await Service.find().populate("car").skip((page - 1) * limit).limit(limit);
  return services;
};

const getServicesByType = async (req) =>
  getPaginatedWithPopulate(Service, req, ALLOWED_SERVICE_POPULATE_FIELDS);

const getServicesByCar = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const services = await Service.find({ car: req.params.car })
    .skip((page - 1) * limit)
    .limit(limit);
  return services;
};

const getServicesByUser = async (req) => {
  if (req.user.id !== req.params.user && !req.user.isAdmin) {
    throw createError(403, "Not authorized");
  }
  // Service has no user field — resolve via the user's cars
  const cars = await Car.find({ owner: req.params.user }).select("_id").lean();
  const carIds = cars.map((c) => c._id);
  const services = await Service.find({ car: { $in: carIds } });
  return services;
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
