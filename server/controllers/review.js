import reviewService from "../services/reviewService.js";
import { createHandler } from "../utils/controllerFactory.js";

// Create review handler
export const createReview = createHandler(reviewService.createReview, 201);

// Get all reviews handler
export const getReviews = createHandler(reviewService.getReviews, 200);
