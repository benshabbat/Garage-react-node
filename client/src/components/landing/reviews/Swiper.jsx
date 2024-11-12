import "./swiper.css";
import { useSwiper } from "./utilsReview";

const Swiper = ({ children, numCardsPreview }) => {
  const { getVisibleCards, nextCard, prevCard, currentIndex, indexPagination } =
    useSwiper(children, numCardsPreview);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <div className="swiper-slides">{getVisibleCards(children)}</div>

        <button onClick={prevCard} className="nav-button prev-button">
          ❮
        </button>

        <button onClick={nextCard} className="nav-button next-button">
          ❯
        </button>
      </div>

      <div className="pagination">
        {children.map((_, index) => (
          <button
            key={index}
            className={`dot ${
              currentIndex % children.length === index ? "active" : ""
            }`}
            onClick={() => indexPagination(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Swiper;
