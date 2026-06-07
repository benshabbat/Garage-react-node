import { useEffect } from "react";
import SwiperReviews from "./SwiperReviews";
import AddReview from "./AddReview";
import Submitted from "../../Submitted";
import { useReviewsState as useReviewsContext } from "./hooks/useReviewsState";

export default function ViewReviews() {
  const { isSubmittedTemp, setIsSubmittedTemp } = useReviewsContext();

  useEffect(() => {
    if (!isSubmittedTemp) return;
    const id = setTimeout(() => setIsSubmittedTemp(false), 7000);
    return () => clearTimeout(id);
  }, [isSubmittedTemp, setIsSubmittedTemp]);

  if (isSubmittedTemp) {
    return (
      <Submitted
        setIsSubmitted={setIsSubmittedTemp}
        review={true}
        name={"review"}
        text={"Thank you for your review!"}
      />
    );
  }

  return (
    <div id="reviews">
      <h1 className="reviews-header">Reviews</h1>
      <SwiperReviews />
      <AddReview />
    </div>
  );
}
