import { useRef } from "react";
import { OpenModal } from "../../index";
import { useReviewsContext } from "./ReviewsContext";
import StarRating from "./starRating/StarRating";


const CreateReviews = () => {

  const { handleAddReview, isOpenAddReview, useAddReview } =
    useReviewsContext();
  const { addReview, setStars, nameRef, descRef} = useAddReview();
  const numRef = useRef();
  const maxLength = 80;



  return (
    <OpenModal
      comp={
        <form className="form">
          <button onClick={handleAddReview} className="form-close">
            X
          </button>
          <h1>Garage review</h1>
          <label className="form-label">
            <StarRating onRatingChange={(value) => setStars(value)} />
          </label>
          <label className="form-label">
            <span>Name</span>
            <input
              autoFocus
              ref={nameRef}
              type="text"
              title="Name"
              placeholder="type your name.."
            />
          </label>
          <label className="form-label">
            <span>Description </span>
            <textarea
              ref={descRef}
              maxLength={maxLength}
              type="text"
              title="Description"
              rows={8}
              placeholder={`Write your review (max ${maxLength} chart)`}
              onChange={() =>
                (numRef.current.value =
                  maxLength - descRef.current.value.length)
              }
            />
            <input className="num" ref={numRef} value={maxLength} readOnly />
          </label>
          <button className="form-btn" onClick={addReview}>
            Add Reviews
          </button>
        </form>
      }
      isOpen={isOpenAddReview}
    />
  );
};

export default CreateReviews;
