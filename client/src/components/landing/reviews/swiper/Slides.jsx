import { useReviewsContext } from "../ReviewsContext";

export default function Slides({ children }) {
  const { getVisibleCards } = useReviewsContext();
  return <div className="swiper-slides">{getVisibleCards(children)}</div>;
}
