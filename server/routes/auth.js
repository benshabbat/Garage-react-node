import express from "express";
import { register, login, logout, getAdminId } from "../controllers/auth.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/logout", logout);

// Auth routes — any verified user
const authRouter = express.Router();
authRouter.use(verifyToken);
authRouter.get("/admin-id", getAdminId);

// Admin-only routes
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);
adminRouter.post("/register", register);

router.use(authRouter);
router.use(adminRouter);

export default router;