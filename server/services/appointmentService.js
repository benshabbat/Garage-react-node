import Appointment from "../models/Appointment.js";

const createAppointment = async (req) => {
  const newAppointment = new Appointment(req.body);
  try {
    const savedAppointment = await newAppointment.save();
    return savedAppointment;
  } catch (error) {
    throw Error(error);
  }
};

const getAppointments = async () => {
  try {
    const Appointments = await Appointment.find();
    return Appointments;
  } catch (error) {
    throw Error(error);
  }
};

const appointmentService = {
  createAppointment,
  getAppointments,
};

export default appointmentService;
