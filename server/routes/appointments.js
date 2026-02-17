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
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {
  validateAppointmentCreation,
  validateAppointmentUpdate,
  validateStatusUpdate,
} from "../middleware/validateAppointment.js";

const router = express.Router();

// Public routes
router.post("/", validateAppointmentCreation, createAppointment); // Anyone can create an appointment

// Admin routes
router.get("/", verifyAdmin, getAppointments); // Get all appointments
router.get("/status", verifyAdmin, getAppointmentsByStatus); // Filter by status
router.get("/date-range", verifyAdmin, getAppointmentsByDateRange); // Filter by date range

// Admin & User routes
router.get("/:id", verifyUser, getAppointment); // Get single appointment
router.put("/:id", verifyAdmin, validateAppointmentUpdate, updateAppointment); // Update appointment
router.patch("/:id/status", verifyAdmin, validateStatusUpdate, updateAppointmentStatus); // Update status only
router.delete("/:id", verifyAdmin, deleteAppointment); // Delete appointment

export default router;