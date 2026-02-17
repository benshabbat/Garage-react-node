import Appointment from "../models/Appointment.js";

const createAppointment = async (req) => {
  const newAppointment = new Appointment(req.body);
  const savedAppointment = await newAppointment.save();
  return savedAppointment;
};

const getAppointments = async () => {
  const Appointments = await Appointment.find();
  return Appointments;
};

const appointmentService = {
  createAppointment,
  getAppointments,
};

export default appointmentService;
