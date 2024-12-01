import { useState, useEffect } from "react";
import { ReviewsContext } from "./ReviewsContext";
import useOpenModal from "../../../hooks/useOpenModal";
import { getReviews } from "../../../utils";
export default function ReviewsProvider({ children }) {
  const [handleAddReview, isOpenAddReview] = useOpenModal();
  // State for current slide index and number of cards to display
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numCardsPreview, setNumCardsPreview] = useState(4);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const reviews = async () => {
      const { data } = await getReviews();
      setAllReviews(data);
    };
    reviews();
  }, []);
  const totalCards = allReviews.length;
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

  // Get currently visible cards based on index and number of cards to show
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
    const isLastSet = currentIndex + numCardsPreview >= totalCards;

    if (isLastSet) {
      // If at the end, go back to start
      setCurrentIndex(0);
    } else {
      // Move forward by numCardsPreview
      setCurrentIndex((prev) => prev + numCardsPreview);
    }
  };

  // Handle navigation to previous set of cards
  const prevCard = () => {
    const isFirstSet = currentIndex - numCardsPreview < 0;

    if (isFirstSet) {
      // If at the start, go to last possible set
      const lastGroupStart =
        Math.floor((totalCards - 1) / numCardsPreview) * numCardsPreview;
      setCurrentIndex(lastGroupStart);
    } else {
      // Move backward by numCardsPreview
      setCurrentIndex((prev) => prev - numCardsPreview);
    }
  };

  // Handle pagination dot click
  const indexPagination = (index) => {
    const newStartIndex = index * numCardsPreview;
    setCurrentIndex(newStartIndex);
  };

  const value = {
    handleAddReview,
    isOpenAddReview,
    indexPagination,
    prevCard,
    nextCard,
    getVisibleCards,
    totalCards,
    numCardsPreview,
    currentIndex,
    allReviews,
  };
  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}
