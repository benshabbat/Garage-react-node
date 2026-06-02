import express from "express";
import { getReviews, createReview } from "../controllers/review.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", getReviews);
router.post("/", verifyToken, createReview);

export default router;