import appointmentService from "../services/appointmentService.js";
import { createHandler } from "../utils/controllerFactory.js";

// Create appointment handler
export const createAppointment = createHandler(appointmentService.createAppointment, 201);

// Get all appointments handler
export const getAppointments = createHandler(appointmentService.getAppointments, 200);
