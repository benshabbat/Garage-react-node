import "./reviews.css";
import AddReview from "./AddReview";
import ReviewsProvider from "./ReviewsProvider";
import SwiperReviews from "./SwiperReviews";

//TODO:CONTEXT AND PROVIDER
const Reviews = () => {
  return (
    <ReviewsProvider>
      <div id="reviews">
        <h1 className="reviews-header">Reviews</h1>
        <SwiperReviews />
        <AddReview />
      </div>
    </ReviewsProvider>
  );
};

export default Reviews;
