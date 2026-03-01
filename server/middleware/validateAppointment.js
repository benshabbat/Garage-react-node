import { createError } from "../utils/error.js";

// ── Pure field validators (return error message string or null) ───────────────

const validateClientName = (v) =>
  typeof v !== "string" || v.trim().length < 2
    ? "Client name must be at least 2 characters long"
    : null;

const validateEmail = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Invalid email format";

const validatePhone = (v) =>
  /^(\+972|0)?[5-9]\d{8}$/.test(v.replace(/[-\s]/g, ""))
    ? null
    : "Invalid phone number format";

const validateDate = (v) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(v) < today
    ? "Appointment date must be in the future"
    : null;
};

const validateTime = (v) =>
  /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v)
    ? null
    : "Invalid time format. Use HH:MM";

// ── Middleware ────────────────────────────────────────────────────────────────

/**
 * Validates appointment creation data
 */
export const validateAppointmentCreation = (req, res, next) => {
  const { clientName, email, phone, date, time } = req.body;

  if (!clientName || !email || !phone || !date || !time) {
    return next(createError(400, "All required fields must be provided"));
  }

  const error =
    validateClientName(clientName) ||
    validateEmail(email) ||
    validatePhone(phone) ||
    validateDate(date) ||
    validateTime(time);

  if (error) return next(createError(400, error));
  next();
};

/**
 * Validates appointment update data (all fields optional)
 */
export const validateAppointmentUpdate = (req, res, next) => {
  const { clientName, email, phone, date, time } = req.body;

  const error =
    (clientName && validateClientName(clientName)) ||
    (email && validateEmail(email)) ||
    (phone && validatePhone(phone)) ||
    (date && validateDate(date)) ||
    (time && validateTime(time));

  if (error) return next(createError(400, error));
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

