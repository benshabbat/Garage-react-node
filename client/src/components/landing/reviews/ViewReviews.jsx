import SwiperReviews from "./SwiperReviews";
import AddReview from "./AddReview";
import Submitted from "../../Submitted";
import { useReviewsContext } from "./ReviewsContext";

export default function ViewReviews() {
  const { useAddReview } = useReviewsContext();
  const { isSubmitted, setIsSubmitted } = useAddReview();

  if (isSubmitted) {
    return <Submitted setIsSubmitted={setIsSubmitted} />;
  }
  
  return (
    <div id="reviews">
      <h1 className="reviews-header">Reviews</h1>
      <SwiperReviews />
      <AddReview />
    </div>
  );
}