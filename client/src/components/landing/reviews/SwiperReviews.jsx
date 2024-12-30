import { Review } from "../../index";
import { useReviewsContext } from "./ReviewsContext";
import Swiper from "./swiper/Swiper";

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
export default function SwiperReviews() {
  const { allReviews, useAddReview } = useReviewsContext();
  const { isSubmitted, setIsSubmitted } = useAddReview();

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
  if (!isSubmitted) {
    return (
      <Swiper>
        {allReviews?.map((customer, index) => (
          <Review customer={customer} key={index} />
        ))}
      </Swiper>
    );
  }
}
