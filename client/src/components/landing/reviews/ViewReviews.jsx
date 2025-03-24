import SwiperReviews from "./SwiperReviews";
import AddReview from "./AddReview";
import Submitted from "../../Submitted";
import { useReviewsContext } from "./ReviewsContext";

export default function ViewReviews() {
  const { useAddReview } = useReviewsContext();
  const { isSubmitted, setIsSubmitted } = useAddReview();

  if (isSubmitted) {
    setTimeout(() => {
      setIsSubmitted(false)
    }, 7000);
    return <Submitted setIsSubmitted={setIsSubmitted} review={true} name={"review"} text={"Thank you for your review!"}/>
  }
  
  
  return (
    <div id="reviews">
      <h1 className="reviews-header">Reviews</h1>
      <SwiperReviews />
      <AddReview />
    </div>
  );
}