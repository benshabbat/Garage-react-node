import "./reviews.css";
import ReviewsProvider from "./ReviewsProvider";
import { CreateReviews } from "../../index";
import ViewReviews from "./ViewReviews";

const Reviews = () => {
  return (
    <ReviewsProvider>
      <ViewReviews />
      <CreateReviews />
    </ReviewsProvider>
  );
};

export default Reviews;
