import express from "express";
import {
  createService,
  updateService,
  deleteService,
  getService,
  getServices,
  getServicesByType,
  getServicesByCar,
  getServicesByUser
} from "../controllers/service.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// Public routes
router.get("/user/:user", getServicesByUser);

// Admin routes
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);
adminRouter.get("/populate", getServicesByType);
adminRouter.get("/", getServices);
adminRouter.post("/:carId", createService);
adminRouter.put("/:id", updateService);
adminRouter.delete("/:id", deleteService);

// User routes
const userRouter = express.Router();
userRouter.use(verifyUser);
userRouter.get("/car/:car", getServicesByCar);
userRouter.get("/:id", getService);

router.use(adminRouter);
router.use(userRouter);

export default router;
