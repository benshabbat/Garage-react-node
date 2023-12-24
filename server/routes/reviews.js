import express from "express";
import { getReviews, createReview } from "../controllers/review.js";
const router = express.Router();

//GET ALL
router.get("/", getReviews);

//POST
router.post("/", createReview);

export default router;