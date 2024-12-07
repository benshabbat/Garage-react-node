import { CreateReviews } from "../../index";
import { useReviewsContext } from "./ReviewsContext";

export default function AddReview() {
  const {handleAddReview} =useReviewsContext()
  return (
    <>
      <button className="btn-add-review" onClick={handleAddReview}>
        Share Your Experience
      </button>
      <CreateReviews/>
    </>
  );
}
