import serviceService from "../services/serviceService.js";
import { createHandler } from "../utils/controllerFactory.js";

// Service handlers using the shared controller factory
export const createService = createHandler(serviceService.createService, 201);
export const updateService = createHandler(serviceService.updateService, 200);
export const deleteService = createHandler(serviceService.deleteService, 200);
export const getService = createHandler(serviceService.getService, 200);
export const getServices = createHandler(serviceService.getServices, 200);
export const getServicesByType = createHandler(serviceService.getServicesByType, 200);
export const getServicesByCar = createHandler(serviceService.getServicesByCar, 200);
export const getServicesByUser = createHandler(serviceService.getServicesByUser, 200);


