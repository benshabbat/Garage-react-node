import { createCrudOperations } from "../crudOperations.js";
import { API_URL_REVIEWS } from "../apiEndpoints.js";

const reviewOps = createCrudOperations(API_URL_REVIEWS);

/**
 * Review API operations
 */
export const reviewApi = {
  // Get all reviews
  getAll: reviewOps.getAll,
  
  // Get review by ID
  getById: reviewOps.getById,
  
  // Create new review
  create: reviewOps.create,
  
  // Update review
  update: reviewOps.update,
  
  // Delete review
  delete: reviewOps.delete,
};

// Legacy exports for backwards compatibility
export const getReviews = reviewApi.getAll;
export const createReview = reviewApi.create;