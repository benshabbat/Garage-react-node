import "./reviews.css";
import ReviewsProvider from "./ReviewsProvider";
import { CreateReviews } from "../../index";
import ViewReviews from "./ViewReviews";

//TODO:CONTEXT AND PROVIDER
const Reviews = () => {
  return (
    <ReviewsProvider>
      <ViewReviews />
      <CreateReviews />
    </ReviewsProvider>
  );
};

export default Reviews;
