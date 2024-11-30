import { useState } from "react";
import { SwiperContext } from "./SwiperContext";
export default function SwiperProvider({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const numCardsPreview = 4;
  const totalCards = children?.length;

  const getVisibleCards = (cards) => {
    const start = currentIndex;
    const end = Math.min(start + numCardsPreview, totalCards);
    return cards.slice(start, end);
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

  const value = {
    indexPagination,
    prevCard,
    nextCard,
    getVisibleCards,
    totalCards,numCardsPreview,currentIndex
  };
  return (
    <SwiperContext.Provider value={value}>{children}</SwiperContext.Provider>
  );
}
