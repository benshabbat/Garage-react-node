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
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { auditAdmin } from "../middleware/audit.js";
const router = express.Router();

// Admin routes
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);
adminRouter.get("/populate", getServicesByType);
adminRouter.get("/", getServices);
adminRouter.post("/:carId", auditAdmin("CREATE_SERVICE", "Service"), createService);
adminRouter.put("/:id", auditAdmin("UPDATE_SERVICE", "Service"), updateService);
adminRouter.delete("/:id", auditAdmin("DELETE_SERVICE", "Service"), deleteService);

// User routes
const userRouter = express.Router();
userRouter.use(verifyUser);
userRouter.get("/user/:user", getServicesByUser);
userRouter.get("/car/:car", getServicesByCar);
userRouter.get("/:id", getService);

router.use(adminRouter);
router.use(userRouter);

export default router;
