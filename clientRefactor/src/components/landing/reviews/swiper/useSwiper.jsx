import { useState, useEffect } from "react";

export function useSwiper(children) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numCardsPreview, setNumCardsPreview] = useState(4);
  const totalCards = children.length;

  useEffect(() => {
    const updateNumCards = () => {
      if (window.innerWidth < 768) {
        setNumCardsPreview(1);
      } else if (window.innerWidth < 1024) {
        setNumCardsPreview(2);
      } else if (window.innerWidth < 1440) {
        setNumCardsPreview(3);
      } else {
        setNumCardsPreview(4);
      }
    };

    // Initial setup
    updateNumCards();

    // Update on resize
    window.addEventListener('resize', updateNumCards);
    return () => window.removeEventListener('resize', updateNumCards);
  }, []);

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

  return { Slides, Pagination, NextCard, PrevCard };
}