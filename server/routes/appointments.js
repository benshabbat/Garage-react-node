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
router.post("/", validateAppointmentCreation, createAppointment);

// Admin routes
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);
adminRouter.get("/", getAppointments);
adminRouter.get("/status", getAppointmentsByStatus);
adminRouter.get("/date-range", getAppointmentsByDateRange);
adminRouter.put("/:id", validateAppointmentUpdate, updateAppointment);
adminRouter.patch("/:id/status", validateStatusUpdate, updateAppointmentStatus);
adminRouter.delete("/:id", deleteAppointment);

// User routes
const userRouter = express.Router();
userRouter.use(verifyUser);
userRouter.get("/:id", getAppointment);

router.use(adminRouter);
router.use(userRouter);

export default router;