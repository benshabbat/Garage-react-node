
import { useReviewsContext } from "./ReviewsContext";

export default function AddReview() {
  const {handleAddReview} =useReviewsContext()
  return (
    <div className="button-container">
      <button className="btn-add-review" onClick={handleAddReview}>
        Share Your Experience
      </button>
   
    </div>
  );
}
