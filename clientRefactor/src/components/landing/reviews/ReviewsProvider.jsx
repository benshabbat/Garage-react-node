import { useState, useEffect } from "react";
import { ReviewsContext } from "./ReviewsContext";
import useOpenModal from "../../../hooks/useOpenModal";
import { getReviews } from "../../../utils";


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

export default function ReviewsProvider({ children }) {
  const [handleAddReview, isOpenAddReview] = useOpenModal();
  // State for current slide index and number of cards to display
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numCardsPreview, setNumCardsPreview] = useState(4);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await getReviews();
      setAllReviews(data);
    };
    fetchReviews();
  }, []);
  const totalCards = allReviews.length;

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
    setCurrentIndex((prev) => 
      (prev + numCardsPreview) % allReviews.length
    );
  };


  const prevCard = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - numCardsPreview;
      return newIndex < 0 ? 
        Math.floor((allReviews.length - 1) / numCardsPreview) * numCardsPreview : 
        newIndex;
    });
  };

  // Handle pagination dot click
  const indexPagination = (index) => {
    setCurrentIndex(index * numCardsPreview);
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
