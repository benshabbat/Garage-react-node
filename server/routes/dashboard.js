import express from "express";
import { getDashboardStats } from "../controllers/dashboard.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.use(verifyAdmin);

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get comprehensive dashboard statistics
 * @access  Admin only
 */
router.get("/stats", getDashboardStats);

export default router;
