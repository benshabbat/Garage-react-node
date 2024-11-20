import { useState } from "react";

export function useSwiper(children, numCardsPreview) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = children.length;

  const getVisibleCards = () => {
    const start = currentIndex;
    const end = Math.min(start + numCardsPreview, totalCards);
    return children.slice(start, end);
  };

  const nextCard = () => {
    if (currentIndex + numCardsPreview < totalCards) {
      setCurrentIndex((prev) => prev + numCardsPreview);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevCard = () => {
    if (currentIndex - numCardsPreview >= 0) {
      setCurrentIndex((prev) => prev - numCardsPreview);
    } else {
      const lastGroupStart =
        Math.floor((totalCards - 1) / numCardsPreview) * numCardsPreview;
      setCurrentIndex(lastGroupStart);
    }
  };

  const indexPagination = (index) => {
    setCurrentIndex(index * numCardsPreview);
  };

  const PrevCard = () => {
    return (
      <button onClick={prevCard} className="nav-button prev-button">
        ❮
      </button>
    );
  };
  const NextCard = () => {
    return (
      <button onClick={nextCard} className="nav-button next-button">
        ❯
      </button>
    );
  };

  const Pagination = () => {
    return (
      <div className="pagination">
        {Array(Math.ceil(totalCards / numCardsPreview))
          .fill()
          .map((_, index) => (
            <button
              key={index}
              className={`dot ${
                Math.floor(currentIndex / numCardsPreview) === index
                  ? "active"
                  : ""
              }`}
              onClick={() => indexPagination(index)}
            />
          ))}
      </div>
    );
  };

  const Slides = ({ children }) => {
    return <div className="swiper-slides">{getVisibleCards(children)}</div>;
  };

  const Layout = ({ children }) => {
    return (
      <div className="swiper-outer-container">
        <div
          className="swiper-container"
          style={{ "--num-cards-preview": numCardsPreview }}
        >
          <PrevCard />
          <div className="swiper-content">
            <Slides children={children} />
          </div>
          <NextCard />
          <Pagination />
        </div>
      </div>
    );
  };

  return { Layout };
}
