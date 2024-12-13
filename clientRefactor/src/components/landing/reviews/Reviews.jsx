import "./reviews.css";
import AddReview from "./AddReview";
import ReviewsProvider from "./ReviewsProvider";
import SwiperReviews from "./SwiperReviews";
import { CreateReviews } from "../../index";

//TODO:CONTEXT AND PROVIDER
const Reviews = () => {
  return (
    <ReviewsProvider>
      <div id="reviews">
        <h1 className="reviews-header">Reviews</h1>
        <SwiperReviews />
        <AddReview />
      </div>
      <CreateReviews />
    </ReviewsProvider>
  );
};

export default Reviews;
