import { useState } from "react";


export default function useCardsNavigation(numCardsPreview,totalCards) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Handle navigation to next set of cards
  const nextCard = () => {
    setCurrentIndex((prev) => (prev + numCardsPreview) % totalCards);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - numCardsPreview;
      return newIndex < 0
        ? Math.floor((totalCards- 1) / numCardsPreview) *
            numCardsPreview
        : newIndex;
    });
  };

  // Handle pagination dot click
  const indexPagination = (index) => {
    setCurrentIndex(index * numCardsPreview);
  };

  return {currentIndex,nextCard,prevCard,indexPagination};
}
