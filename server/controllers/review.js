import reviewService from "../services/reviewService.js";
export const createReview = async (req, res, next) => {
  try {
    const savedReview = await reviewService.createReview(req);
    res.status(200).json(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
