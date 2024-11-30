import { CreateReviews } from "../../index";
import useOpenModal from "../../../hooks/useOpenModal";

export default function AddReview() {
  const [handleAddReview, isOpenAddReview] = useOpenModal();
  return (
    <>
      <button className="btn-add-review" onClick={handleAddReview}>
        Share Your Experience
      </button>
      <CreateReviews handelClick={handleAddReview} isOpen={isOpenAddReview} />
    </>
  );
}
