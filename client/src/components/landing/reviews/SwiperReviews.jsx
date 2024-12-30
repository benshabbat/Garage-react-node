import { Review } from "../../index";
import { useReviewsContext } from "./ReviewsContext";
import Swiper from "./swiper/Swiper";
import CheckCircle from "../../../icons/CheckCircle";
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
