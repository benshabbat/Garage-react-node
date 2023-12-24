import Review from "../models/Review.js";

const createReview = async (req) => {
    const newReview = new Review(req.body);
    try {
      const savedReview = await newReview.save();
      return savedReview;
    } catch (error) {
      throw Error(error);
    }
  };

  const getReviews = async () => {
    try {
      const reviews = await Review.find();
      return reviews;
    } catch (error) {
      throw Error(error);
    }
  };


  const reviewService = {
    createReview,
    getReviews,
   
  };
  
  export default reviewService;
  