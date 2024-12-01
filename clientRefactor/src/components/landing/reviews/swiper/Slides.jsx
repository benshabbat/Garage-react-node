import { useSwiperContext } from "./SwiperContext";

export default function Slides({ children }) {
  const { getVisibleCards } = useSwiperContext();
  return <div className="swiper-slides">{getVisibleCards(children)}</div>;
}
