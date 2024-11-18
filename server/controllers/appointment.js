import appointmentService from "../services/appointmentService.js";

export const createAppointment = async (req, res, next) => {
  try {
    const savedAppointment = await appointmentService.createAppointment(req);
    res.status(200).json(savedAppointment);
  } catch (err) {
    next(err);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};
