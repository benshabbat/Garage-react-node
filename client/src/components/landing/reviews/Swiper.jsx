import "./swiper.css";
import { useSwiper } from "./utilsReview";

const Swiper = ({ children, numCardsPreview }) => {
  const { Slides, NextCard, PrevCard, Pagination } = useSwiper(
    children,
    numCardsPreview
  );

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <Slides />
        <PrevCard />
        <NextCard />
      </div>
      <Pagination />
    </div>
  );
};

export default Swiper;
