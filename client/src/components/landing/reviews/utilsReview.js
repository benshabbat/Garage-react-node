import { useState } from "react";

export function useSwiper(children, numCardsPreview) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = numCardsPreview;
  const totalCards = children.length;

  const getVisibleCards = (children) => {
    let visibleCards = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % totalCards;
      visibleCards.push(children[index]);
    }
    return visibleCards;
  };

  const nextCard = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => prev - 1 + totalCards);
  };
  const indexPagination = (index) => setCurrentIndex(index);

  return {getVisibleCards, nextCard, prevCard, currentIndex, indexPagination};
}
