import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUsersByType,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// Admin routes
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);
adminRouter.get("/populate", getUsersByType);
adminRouter.get("/", getUsers);
adminRouter.put("/:id", updateUser);
adminRouter.delete("/:id", deleteUser);

// User routes
const userRouter = express.Router();
userRouter.use(verifyUser);
userRouter.get("/:id", getUser);

router.use(adminRouter);
router.use(userRouter);

export default router;
