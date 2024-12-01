import { useState, useEffect } from "react";
import { useReviewsContext } from "../ReviewsContext";

// Screen breakpoints for responsive design
const SCREEN_BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
};

// Number of cards to show at each breakpoint
const CARDS_PER_BREAKPOINT = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
  LARGE_DESKTOP: 4,
};
export default function useSwiper() {
  const { allReviews } = useReviewsContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numCardsPreview, setNumCardsPreview] = useState(4);
  const totalCards = allReviews.length;
  const numberOfPages = Math.ceil(totalCards / numCardsPreview);

  
  useEffect(() => {
    // Update number of cards based on screen width
    const updateNumCards = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < SCREEN_BREAKPOINTS.MOBILE) {
        setNumCardsPreview(CARDS_PER_BREAKPOINT.MOBILE);
      } else if (screenWidth < SCREEN_BREAKPOINTS.TABLET) {
        setNumCardsPreview(CARDS_PER_BREAKPOINT.TABLET);
      } else if (screenWidth < SCREEN_BREAKPOINTS.DESKTOP) {
        setNumCardsPreview(CARDS_PER_BREAKPOINT.DESKTOP);
      } else {
        setNumCardsPreview(CARDS_PER_BREAKPOINT.LARGE_DESKTOP);
      }
    };

    // Initial setup
    updateNumCards();

    // Update on resize
    window.addEventListener("resize", updateNumCards);

    // Cleanup
    return () => window.removeEventListener("resize", updateNumCards);
  }, []);
  
  const getVisibleCards = (children) => {
    if (!Array.isArray(children)) {
      return children;
    }
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + numCardsPreview, children.length);
    return children.slice(startIndex, endIndex);
  };

  // Handle navigation to next set of cards
  const nextCard = () => {
    setCurrentIndex((prev) => (prev + numCardsPreview) % totalCards);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - numCardsPreview;
      return newIndex < 0
        ? Math.floor((allReviews.length - 1) / numCardsPreview) *
            numCardsPreview
        : newIndex;
    });
  };

  // Handle pagination dot click
  const indexPagination = (index) => {
    setCurrentIndex(index * numCardsPreview);
  };

  return {
    getVisibleCards,
    nextCard,
    prevCard,
    indexPagination,
    numberOfPages,
    numCardsPreview,
  };
}
