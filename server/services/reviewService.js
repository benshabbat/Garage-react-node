import Review from "../models/Review.js";

const createReview = async (req) => {
  const newReview = new Review(req.body);
  const savedReview = await newReview.save();
  return savedReview;
};

const getReviews = async () => {
  const reviews = await Review.find();
  return reviews;
};

const reviewService = {
  createReview,
  getReviews,
};

export default reviewService;
  