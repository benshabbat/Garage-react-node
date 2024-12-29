import { useRef } from "react";
import { OpenModal } from "../../index";
import { useReviewsContext } from "./ReviewsContext";
import StarRating from "./starRating/StarRating";
const CheckCircle = () => (
  <svg 
    className="success-icon" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      className="check-circle" 
      stroke="currentColor" 
      strokeWidth="2"
    />
    <path 
      d="M8 12.5L10.5 15L16 9" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="check-mark"
    />
  </svg>
);

const CreateReviews = () => {

  const { handleAddReview, isOpenAddReview, useAddReview } =
    useReviewsContext();
  const { addReview, setStars, nameRef, descRef,isSubmitted,setIsSubmitted } = useAddReview();
  const numRef = useRef();
  const maxLength = 80;

  if (isSubmitted) {
    return (
      <div className="container-contact">
        <div className="success-message">
          <CheckCircle className="success-icon" />
          <h2 className="success-title">Thank You!</h2>
          <p>Your message has been sent successfully.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="new-message-button"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

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
