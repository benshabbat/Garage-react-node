import { useState } from "react";

export default function useCardsNavigation(numCardsPreview, totalCards) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!totalCards || !numCardsPreview) {
    return { currentIndex: 0, nextCard: () => {}, prevCard: () => {}, indexPagination: () => {} };
  }

  const lastPageStart = Math.floor((totalCards - 1) / numCardsPreview) * numCardsPreview;

  // Handle navigation to next set of cards
  const nextCard = () => {
    setCurrentIndex((prev) => (prev >= lastPageStart ? 0 : prev + numCardsPreview));
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev === 0 ? lastPageStart : prev - numCardsPreview));
  };

  // Handle pagination dot click
  const indexPagination = (index) => {
    setCurrentIndex(index * numCardsPreview);
  };

  return { currentIndex, nextCard, prevCard, indexPagination };
}
