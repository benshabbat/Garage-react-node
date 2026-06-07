import Review from "../models/Review.js";
import { getPaginationParams, pickAllowed } from "../utils/queryHelpers.js";

const ALLOWED_REVIEW_FIELDS = ['name', 'description', 'stars'];

const createReview = async (req) => {
  const safeBody = pickAllowed(req.body, ALLOWED_REVIEW_FIELDS);
  const newReview = new Review(safeBody);
  const savedReview = await newReview.save();
  return savedReview;
};

const getReviews = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const reviews = await Review.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
  return reviews;
};

const reviewService = {
  createReview,
  getReviews,
};

export default reviewService;
  