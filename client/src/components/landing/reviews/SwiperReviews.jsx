import { Review } from "../../index";
import { useReviewsContext } from "./ReviewsContext";
import Swiper from "./swiper/Swiper";
//TODO: MADE COMPONENT FOR isSubmitted
export default function SwiperReviews() {
  const { allReviews } = useReviewsContext();

  return (
    <Swiper>
      {allReviews?.map((customer, index) => (
        <Review customer={customer} key={index} />
      ))}
    </Swiper>
  );
}
