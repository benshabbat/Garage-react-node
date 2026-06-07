import { Review } from "../../index";
import { useReviewsState as useReviewsContext } from "./hooks/useReviewsState";
import Swiper from "./swiper/Swiper";
export default function SwiperReviews() {
  const { allReviews } = useReviewsContext();

  return (
    <Swiper>
      {allReviews?.map((customer) => (
        <Review customer={customer} key={customer._id} />
      ))}
    </Swiper>
  );
}
