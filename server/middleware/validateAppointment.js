import { createError } from "../utils/error.js";

/**
 * Validates appointment creation data
 */
export const validateAppointmentCreation = (req, res, next) => {
  const { clientName, email, phone, date, time, notes } = req.body;

  // Check for required fields
  if (!clientName || !email || !phone || !date || !time) {
    return next(createError(400, "All required fields must be provided"));
  }

  // Validate client name
  if (typeof clientName !== "string" || clientName.trim().length < 2) {
    return next(createError(400, "Client name must be at least 2 characters long"));
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(createError(400, "Invalid email format"));
  }

  // Validate phone format (Israeli phone)
  const phoneRegex = /^(\+972|0)?[5-9]\d{8}$/;
  if (!phoneRegex.test(phone.replace(/[-\s]/g, ""))) {
    return next(createError(400, "Invalid phone number format"));
  }

  // Validate date is in the future
  const appointmentDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (appointmentDate < today) {
    return next(createError(400, "Appointment date must be in the future"));
  }

  // Validate time format (HH:MM)
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    return next(createError(400, "Invalid time format. Use HH:MM"));
  }

  next();
};

/**
 * Validates appointment update data
 */
export const validateAppointmentUpdate = (req, res, next) => {
  const { clientName, email, phone, date, time } = req.body;

  // Validate fields if provided
  if (clientName && (typeof clientName !== "string" || clientName.trim().length < 2)) {
    return next(createError(400, "Client name must be at least 2 characters long"));
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(createError(400, "Invalid email format"));
    }
  }

  if (phone) {
    const phoneRegex = /^(\+972|0)?[5-9]\d{8}$/;
    if (!phoneRegex.test(phone.replace(/[-\s]/g, ""))) {
      return next(createError(400, "Invalid phone number format"));
    }
  }

  if (date) {
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return next(createError(400, "Appointment date must be in the future"));
    }
  }

  if (time) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      return next(createError(400, "Invalid time format. Use HH:MM"));
    }
  }

  next();
};

/**
 * Validates appointment status update
 */
export const validateStatusUpdate = (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return next(createError(400, "Status is required"));
  }

  const validStatuses = ["pending", "confirmed", "cancelled"];
  if (!validStatuses.includes(status)) {
    return next(
      createError(400, `Status must be one of: ${validStatuses.join(", ")}`)
    );
  }

  next();
};
