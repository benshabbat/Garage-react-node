// CardSwiper.jsx
import { useState } from "react";
import "./CardSwiper.css";

const CardSwiper = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;
  const totalCards = children.length;

  // פונקציה שמחזירה את המערך של הכרטיסים שצריכים להיות מוצגים כרגע
  const getVisibleCards = () => {
    let visibleCards = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % totalCards;
      visibleCards.push(children[index]);
    }
    return visibleCards;
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <div className="swiper-slides">{getVisibleCards()}</div>

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
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSwiper;
