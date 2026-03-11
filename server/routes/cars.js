import express from "express";
import {
    updateCar,
    deleteCar,
    getCar,
    getCars,
    createCar,
    getCarsByType,getCarsWithService,getCarsByOwner
  } from "../controllers/car.js";
  import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
  const router = express.Router();

// Admin routes
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);
adminRouter.get("/populate", getCarsByType);
adminRouter.get("/", getCars);
adminRouter.post("/:userId", createCar);
adminRouter.put("/:id", updateCar);
adminRouter.delete("/:id/:userId", deleteCar);

// User routes
const userRouter = express.Router();
userRouter.use(verifyUser);
userRouter.get("/service", getCarsWithService);
userRouter.get("/user/:user", getCarsByOwner);
userRouter.get("/:id", getCar);

router.use(adminRouter);
router.use(userRouter);

export default router;