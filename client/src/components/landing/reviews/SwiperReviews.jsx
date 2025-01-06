import { Review } from "../../index";
import Submitted from "../../Submitted";
import { useReviewsContext } from "./ReviewsContext";
import Swiper from "./swiper/Swiper";
//TODO: MADE COMPONENT FOR isSubmitted 
export default function SwiperReviews() {
  const { allReviews, useAddReview } = useReviewsContext();
  const { isSubmitted, setIsSubmitted } = useAddReview();

  if (isSubmitted) {
    return <Submitted setIsSubmitted={setIsSubmitted} />;
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
