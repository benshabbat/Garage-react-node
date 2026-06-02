import { useReviewsState as useReviewsContext } from "../hooks/useReviewsState";

export default function Slides({ children }) {
  const { getVisibleCards } = useReviewsContext();
  return <div className="swiper-slides">{getVisibleCards(children)}</div>;
}
