import Service from "../models/Service.js";
import Car from "../models/Car.js";
/**
 * Creates a new service and associates it with a car
 * @param {Object} req - Express request object
 * @returns {Promise<Object>} Created service
 */
const createService = async (req) => {
  const carId = req.params.carId;
  
  // Create a new service object from request body but WITHOUT any _id field
  const serviceData = { ...req.body, car: carId };
  
  // Delete _id property if it exists to ensure MongoDB generates a new unique ID
  delete serviceData._id;
  
  const newService = new Service(serviceData);
  
  try {
    // Save the service
    const savedService = await newService.save();
    
    // Update the car with the service reference
    try {
      await Car.findByIdAndUpdate(carId, {
        $push: { services: savedService._id },
      });
    } catch (error) {
      // If car update fails, delete the service we just created to maintain consistency
      await Service.findByIdAndDelete(savedService._id);
      throw Error(`Failed to update car with service: ${error.message}`);
    }
    
    return savedService;
  } catch (error) {
    // Provide more helpful error message for duplicate key errors
    if (error.code === 11000) {
      throw Error(`Duplicate service entry: ${error.message}`);
    }
    throw Error(`Failed to create service: ${error.message}`);
  }
};

const updateService = async (req) => {
  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  return updatedService;
};

const deleteService = async (req) => {
  await Service.findByIdAndDelete(req.params.id);
};

const getService = async (req) => {
  const service = await Service.findById(req.params.id);
  return service;
};

const getServices = async () => {
  const services = await Service.find().populate("car");
  return services;
};

const getServicesByType = async (req) => {
  const type = req.query.populate;
  const services = await Service.find().populate(type);
  return services;
};

const getServicesByCar = async (req) => {
  const services = await Service.find({ car: req.params.car });
  return services;
};

const getServicesByUser = async (req) => {
  const services = await Service.find({ user: req.params.user });
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
