import express from "express";
import {
  createService,
  updateService,
  deleteService,
  getService,
  getServices,
  getServicesByType,
  getServicesByCar,
  getServicesByUser,
} from "../controllers/service.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { auditAdmin } from "../middleware/audit.js";

const router = express.Router();

// Admin routes
router.get("/populate", verifyAdmin, getServicesByType);
router.get("/", verifyAdmin, getServices);
router.post("/:carId", verifyAdmin, auditAdmin("CREATE_SERVICE", "Service"), createService);
router.put("/:id", verifyAdmin, auditAdmin("UPDATE_SERVICE", "Service"), updateService);
router.delete("/:id", verifyAdmin, auditAdmin("DELETE_SERVICE", "Service"), deleteService);

// Owner or admin — ":user" is a user id
router.get("/user/:user", verifyUser, getServicesByUser);

// Keyed by resource ids — ownership is resolved via the owning car in the service
router.get("/car/:car", verifyToken, getServicesByCar);
router.get("/:id", verifyToken, getService);

export default router;
