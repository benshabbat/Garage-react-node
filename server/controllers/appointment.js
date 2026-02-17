import appointmentService from "../services/appointmentService.js";
import { createHandler } from "../utils/controllerFactory.js";

// Create appointment handler
export const createAppointment = createHandler(
  appointmentService.createAppointment,
  201
);

// Get all appointments handler
export const getAppointments = createHandler(
  appointmentService.getAppointments,
  200
);

// Get single appointment handler
export const getAppointment = createHandler(
  appointmentService.getAppointment,
  200
);

// Update appointment handler
export const updateAppointment = createHandler(
  appointmentService.updateAppointment,
  200
);

// Update appointment status handler
export const updateAppointmentStatus = createHandler(
  appointmentService.updateAppointmentStatus,
  200
);

// Delete appointment handler
export const deleteAppointment = createHandler(
  appointmentService.deleteAppointment,
  200,
  "Appointment has been deleted"
);

// Get appointments by status handler
export const getAppointmentsByStatus = createHandler(
  appointmentService.getAppointmentsByStatus,
  200
);

// Get appointments by date range handler
export const getAppointmentsByDateRange = createHandler(
  appointmentService.getAppointmentsByDateRange,
  200
);
