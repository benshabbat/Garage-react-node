import express from "express";
import {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentsByStatus,
  getAppointmentsByDateRange,
} from "../controllers/appointment.js";
import { optionalAuth, verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import {
  validateAppointmentCreation,
  validateAppointmentUpdate,
  validateStatusUpdate,
} from "../middleware/validateAppointment.js";
import { auditAdmin } from "../middleware/audit.js";

const router = express.Router();

// Public — anyone can book. optionalAuth links the booking to the caller's
// account when they happen to be signed in.
router.post("/", optionalAuth, validateAppointmentCreation, createAppointment);

// Admin routes — literal paths before "/:id"
router.get("/status", verifyAdmin, getAppointmentsByStatus);
router.get("/date-range", verifyAdmin, getAppointmentsByDateRange);
router.get("/", verifyAdmin, getAppointments);
router.put(
  "/:id",
  verifyAdmin,
  validateAppointmentUpdate,
  auditAdmin("UPDATE_APPOINTMENT", "Appointment"),
  updateAppointment
);
router.patch(
  "/:id/status",
  verifyAdmin,
  validateStatusUpdate,
  auditAdmin("UPDATE_APPOINTMENT_STATUS", "Appointment"),
  updateAppointmentStatus
);
router.delete(
  "/:id",
  verifyAdmin,
  auditAdmin("DELETE_APPOINTMENT", "Appointment"),
  deleteAppointment
);

// ":id" is an appointment id — ownership is resolved in the service
router.get("/:id", verifyToken, getAppointment);

export default router;
