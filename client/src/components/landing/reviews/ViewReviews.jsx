import SwiperReviews from "./SwiperReviews";
import AddReview from "./AddReview";
import Submitted from "../../Submitted";
import { useReviewsContext } from "./ReviewsContext";

export default function ViewReviews() {
  const { useAddReview } = useReviewsContext();
  const { isSubmitted, setIsSubmitted } = useAddReview();
  if (isSubmitted) {
    setTimeout(() => {
      return (
        <Submitted
          setIsSubmitted={setIsSubmitted}
          review={true}
          name={"review"}
        />
      );
    }, 3000);
  }

  return (
    <div id="reviews">
      <h1 className="reviews-header">Reviews</h1>
      <SwiperReviews />
      <AddReview />
    </div>
  );
}
