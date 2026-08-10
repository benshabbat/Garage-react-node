import express from "express";
import {
  updateCar,
  deleteCar,
  getCar,
  getCars,
  createCar,
  getCarsByType,
  getCarsWithService,
  getCarsByOwner,
} from "../controllers/car.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { auditAdmin } from "../middleware/audit.js";

const router = express.Router();

// Guards are attached per route rather than with router.use(): a router-level
// verifyAdmin rejects every request that reaches the router, including ones
// meant for the user routes further down, so non-admins never get there.

// Admin routes — literal paths first so they are not swallowed by "/:id"
router.get("/populate", verifyAdmin, getCarsByType);
router.get("/service", verifyAdmin, getCarsWithService); // returns every car, not just the caller's
router.get("/", verifyAdmin, getCars);
router.post("/:userId", verifyAdmin, auditAdmin("CREATE_CAR", "Car"), createCar);
router.put("/:id", verifyAdmin, auditAdmin("UPDATE_CAR", "Car"), updateCar);
router.delete("/:id/:userId", verifyAdmin, auditAdmin("DELETE_CAR", "Car"), deleteCar);

// Owner or admin — ":user" is a user id, so verifyUser can compare it directly
router.get("/user/:user", verifyUser, getCarsByOwner);

// ":id" is a car id — ownership is resolved against car.owner in the service
router.get("/:id", verifyToken, getCar);

export default router;
