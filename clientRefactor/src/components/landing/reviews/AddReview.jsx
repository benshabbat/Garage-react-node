import { CreateReviews } from "../../index";
// import useOpenModal from "../../../hooks/useOpenModal";
import { useReviewsContext } from "./ReviewsContext";

export default function AddReview() {
  // const [handleAddReview, isOpenAddReview] = useOpenModal();
  const {handleAddReview,isOpenAddReview} =useReviewsContext()
  return (
    <>
      <button className="btn-add-review" onClick={handleAddReview}>
        Share Your Experience
      </button>
      <CreateReviews handelClick={handleAddReview} isOpen={isOpenAddReview} />
    </>
  );
}
