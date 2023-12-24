import serviceService from "../services/serviceService.js";

//test create user
export const createService = async (req, res, next) => {
  try {
    const savedService = await serviceService.createService(req);
    res.status(200).json(savedService);
  } catch (err) {
    next(err);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const updatedService = await serviceService.updateService(req);
    res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
};
export const deleteService = async (req, res, next) => {
  try {
    await serviceService.deleteService(req);
    res.status(200).json("The Service has been removed");
  } catch (error) {
    next(error);
  }
};
export const getService = async (req, res, next) => {
  try {
    const service = await serviceService.getService(req);
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};
export const getServices = async (req, res, next) => {
  try {
    const services = await serviceService.getServices();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};
export const getServicesByType = async (req, res, next) => {
  try {
    const services = await serviceService.getServicesByType(req);
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

export const getServicesByCar = async (req, res, next) => {
  try {
    const services = await serviceService.getServicesByCar(req);
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};
export const getServicesByUser = async (req, res, next) => {
  try {
    const services = await serviceService.getServicesByUser(req);
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};
