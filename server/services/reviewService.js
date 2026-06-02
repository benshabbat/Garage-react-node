import Review from "../models/Review.js";

const ALLOWED_REVIEW_FIELDS = ['name', 'description', 'stars'];

const createReview = async (req) => {
  const safeBody = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => ALLOWED_REVIEW_FIELDS.includes(k))
  );
  const newReview = new Review(safeBody);
  const savedReview = await newReview.save();
  return savedReview;
};

const getReviews = async (req) => {
  const limit = Math.min(parseInt(req.query.limit) || 500, 500);
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const reviews = await Review.find().skip((page - 1) * limit).limit(limit);
  return reviews;
};

const reviewService = {
  createReview,
  getReviews,
};

export default reviewService;
  