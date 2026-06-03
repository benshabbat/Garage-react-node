import { useRef } from "react";
import { OpenModal } from "../../index";
import { useReviewsState as useReviewsContext } from "./hooks/useReviewsState";
import StarRating from "./starRating/StarRating";


const CreateReviews = () => {

  const { handleAddReview, isOpenAddReview, useAddReview } =
    useReviewsContext();
  const { addReview, setStars, nameRef, descRef, submitError } = useAddReview();
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
              title="Description"
              rows={8}
              placeholder={`Write your review (max ${maxLength} chars)`}
              onChange={() =>
                (numRef.current.textContent =
                  maxLength - descRef.current.value.length)
              }
            />
            <output className="num" ref={numRef} aria-live="polite" aria-label="Characters remaining">{maxLength}</output>
          </label>
          {submitError && <p className="error">{submitError}</p>}
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
