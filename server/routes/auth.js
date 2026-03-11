import express from "express";
import { register,login,logout } from "../controllers/auth.js";
import { verifyAdmin} from "../utils/verifyToken.js";
const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/logout", logout);

// Admin routes
const adminRouter = express.Router();
adminRouter.use(verifyAdmin);
adminRouter.post("/register", register);

router.use(adminRouter);

export default router;