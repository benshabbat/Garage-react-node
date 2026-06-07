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
import { auditAdmin } from "../middleware/audit.js";

const router = express.Router();

// Public routes
router.post("/", validateAppointmentCreation, createAppointment);

// Admin routes
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);
adminRouter.get("/", getAppointments);
adminRouter.get("/status", getAppointmentsByStatus);
adminRouter.get("/date-range", getAppointmentsByDateRange);
adminRouter.put(
  "/:id",
  validateAppointmentUpdate,
  auditAdmin("UPDATE_APPOINTMENT", "Appointment"),
  updateAppointment
);
adminRouter.patch(
  "/:id/status",
  validateStatusUpdate,
  auditAdmin("UPDATE_APPOINTMENT_STATUS", "Appointment"),
  updateAppointmentStatus
);
adminRouter.delete("/:id", auditAdmin("DELETE_APPOINTMENT", "Appointment"), deleteAppointment);

// User routes
const userRouter = express.Router();
userRouter.use(verifyUser);
userRouter.get("/:id", getAppointment);

router.use(adminRouter);
router.use(userRouter);

export default router;
