import Appointment from "../models/Appointment.js";
import { templatePhone } from "../utils/templates.js";

const createAppointment = async (req) => {
  const { phone } = req.body;
  const formattedPhone = phone ? templatePhone(phone) : phone;
  
  const newAppointment = new Appointment({
    ...req.body,
    phone: formattedPhone,
  });
  const savedAppointment = await newAppointment.save();
  return savedAppointment;
};

const getAppointments = async () => {
  const appointments = await Appointment.find()
    .populate('user', 'username email phone')
    .sort({ date: -1, createdAt: -1 });
  return appointments;
};

const getAppointment = async (req) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('user', 'username email phone');
  return appointment;
};

const updateAppointment = async (req) => {
  const { phone } = req.body;
  const updateData = { ...req.body };
  
  if (phone) {
    updateData.phone = templatePhone(phone);
  }
  
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    { new: true }
  ).populate('user', 'username email phone');
  return updatedAppointment;
};

const updateAppointmentStatus = async (req) => {
  const { status } = req.body;
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { $set: { status } },
    { new: true }
  );
  return updatedAppointment;
};

const deleteAppointment = async (req) => {
  await Appointment.findByIdAndDelete(req.params.id);
  return "Appointment has been deleted";
};

const getAppointmentsByStatus = async (req) => {
  const { status } = req.query;
  const appointments = await Appointment.find({ status }).sort({ date: -1 });
  return appointments;
};

const getAppointmentsByDateRange = async (req) => {
  const { startDate, endDate } = req.query;
  const appointments = await Appointment.find({
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  }).sort({ date: 1 });
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
