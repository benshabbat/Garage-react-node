import Appointment from "../models/Appointment.js";
import { templatePhone } from "../utils/templates.js";
import { createError } from "../utils/error.js";
import { pickAllowed, getPaginationParams } from "../utils/queryHelpers.js";
import {
  sendAppointmentConfirmation,
  sendStatusUpdate,
} from "./emailService.js";

const ALLOWED_APPOINTMENT_CREATE_FIELDS = [
  "clientName",
  "email",
  "phone",
  "date",
  "time",
  "notes",
  "user",
];
const ALLOWED_APPOINTMENT_UPDATE_FIELDS = [
  "clientName",
  "email",
  "phone",
  "date",
  "time",
  "notes",
  "status",
];

const createAppointment = async (req) => {
  const { phone } = req.body;
  const formattedPhone = phone ? templatePhone(phone) : phone;

  const safeBody = pickAllowed(req.body, ALLOWED_APPOINTMENT_CREATE_FIELDS);

  const newAppointment = new Appointment({ ...safeBody, phone: formattedPhone });
  const savedAppointment = await newAppointment.save();
  sendAppointmentConfirmation(savedAppointment); // fire-and-forget
  return savedAppointment;
};

const getAppointments = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const appointments = await Appointment.find()
    .populate("user", "username email phone")
    .sort({ date: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  return appointments;
};

const getAppointment = async (req) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "user",
    "username email phone"
  );
  if (!appointment) throw createError(404, "Appointment not found");
  return appointment;
};

const updateAppointment = async (req) => {
  const updateData = pickAllowed(req.body, ALLOWED_APPOINTMENT_UPDATE_FIELDS);
  if (updateData.phone) updateData.phone = templatePhone(updateData.phone);

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    { new: true }
  ).populate("user", "username email phone");
  if (!updatedAppointment) throw createError(404, "Appointment not found");
  return updatedAppointment;
};

const updateAppointmentStatus = async (req) => {
  const { status } = req.body;
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { $set: { status } },
    { new: true }
  );
  if (!updatedAppointment) throw createError(404, "Appointment not found");
  sendStatusUpdate(updatedAppointment); // fire-and-forget
  return updatedAppointment;
};

const deleteAppointment = async (req) => {
  const deleted = await Appointment.findByIdAndDelete(req.params.id);
  if (!deleted) throw createError(404, "Appointment not found");
  return "Appointment has been deleted";
};

const VALID_STATUSES = ["pending", "confirmed", "cancelled"];

const getAppointmentsByStatus = async (req) => {
  const { status } = req.query;
  if (!status || !VALID_STATUSES.includes(status)) {
    throw createError(400, `Status must be one of: ${VALID_STATUSES.join(", ")}`);
  }
  const { limit, page } = getPaginationParams(req);
  const appointments = await Appointment.find({ status })
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  return appointments;
};

const getAppointmentsByDateRange = async (req) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    throw createError(400, "startDate and endDate are required");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw createError(400, "Invalid date format");
  }

  if (start > end) {
    throw createError(400, "startDate must be before endDate");
  }

  const { limit, page } = getPaginationParams(req);
  const appointments = await Appointment.find({
    date: {
      $gte: start,
      $lte: end,
    },
  })
    .sort({ date: 1 })
    .skip((page - 1) * limit)
    .limit(limit);
  return appointments;
};

const appointmentService = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentsByStatus,
  getAppointmentsByDateRange,
};

export default appointmentService;
