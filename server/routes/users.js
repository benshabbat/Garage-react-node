import express from "express";
import { updateUser, deleteUser, getUser, getUsers, getUsersByType } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { auditAdmin } from "../middleware/audit.js";

const router = express.Router();

// Admin routes
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);
adminRouter.get("/populate", getUsersByType);
adminRouter.get("/", getUsers);
adminRouter.put("/:id", auditAdmin("UPDATE_USER", "User"), updateUser);
adminRouter.delete("/:id", auditAdmin("DELETE_USER", "User"), deleteUser);

// User routes
const userRouter = express.Router();
userRouter.use(verifyUser);
userRouter.get("/:id", getUser);

router.use(adminRouter);
router.use(userRouter);

export default router;
