import "./CardSwiper.css";
import { useState } from "react";

const CardSwiper = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;
  const totalCards = children.length;

  const getVisibleCards = (data) => {
    let visibleCards = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % totalCards;
      visibleCards.push(data[index]);
    }
    return visibleCards;
  };

  const nextCard = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => prev - 1 + totalCards);
  };

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
              currentIndex % totalCards === index ? "active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSwiper;
