import Review from "../models/Review.js";
import User from "../models/User.js";
import { getPaginationParams, pickAllowed } from "../utils/queryHelpers.js";
import { createError } from "../utils/error.js";

const ALLOWED_REVIEW_FIELDS = ["description", "stars"];

const createReview = async (req) => {
  const safeBody = pickAllowed(req.body, ALLOWED_REVIEW_FIELDS);
  const author = await User.findById(req.user.id).select("username").lean();
  if (!author) throw createError(404, "User not found");
  const newReview = new Review({
    ...safeBody,
    user: req.user.id,
    name: author.username,
  });
  const savedReview = await newReview.save();
  return savedReview;
};

const getReviews = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const [reviews, total] = await Promise.all([
    Review.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Review.countDocuments(),
  ]);
  return { data: reviews, total, page, limit };
};

const reviewService = {
  createReview,
  getReviews,
};

export default reviewService;
