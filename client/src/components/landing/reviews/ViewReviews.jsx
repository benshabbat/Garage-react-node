import { useEffect } from "react";
import SwiperReviews from "./SwiperReviews";
import AddReview from "./AddReview";
import Submitted from "../../Submitted";
import { useReviewsState as useReviewsContext } from "./hooks/useReviewsState";

export default function ViewReviews() {
  const { useAddReview } = useReviewsContext();
  const { isSubmitted, setIsSubmitted } = useAddReview();

  useEffect(() => {
    if (!isSubmitted) return;
    const id = setTimeout(() => setIsSubmitted(false), 7000);
    return () => clearTimeout(id);
  }, [isSubmitted, setIsSubmitted]);

  if (isSubmitted) {
    return <Submitted setIsSubmitted={setIsSubmitted} review={true} name={"review"} text={"Thank you for your review!"} />;
  }

  return (
    <div id="reviews">
      <h1 className="reviews-header">Reviews</h1>
      <SwiperReviews />
      <AddReview />
    </div>
  );
}