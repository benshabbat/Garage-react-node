import { useState } from "react";
import { useReviewForm } from "./useReviewForm";
import { useReviewsData } from "./useReviewsData";
import useCardsDisplay from "../swiper/hooks/useCardsDisplay";
import useCardsNavigation from "../swiper/hooks/useCardsNavigation";
import { getVisibleCards, calculateNumberOfPages } from "../utils/reviewsUtils";

/**
 * Custom hook for reviews action handlers
 * @param {Object} modals - Modal handlers
 * @returns {Object} Handler functions and state for reviews operations
 */
export const useReviewsHandlers = (modals) => {
  // Temporary state for form submission tracking
  const [isSubmittedTemp, setIsSubmittedTemp] = useState(false);
  
  // Get reviews data
  const { allReviews, totalCards } = useReviewsData(modals.addReview.isOpen, isSubmittedTemp);

  // Cards display and navigation
  const numCardsPreview = useCardsDisplay();
  const { currentIndex, nextCard, prevCard, indexPagination } =
    useCardsNavigation(numCardsPreview, totalCards);
  const numberOfPages = calculateNumberOfPages(totalCards, numCardsPreview);

  // Helper function to get visible cards
  const getVisibleCardsHelper = (children) => {
    return getVisibleCards(children, currentIndex, numCardsPreview, totalCards);
  };

  /**
   * Hook for adding review
   */
  const useAddReview = () => {
    const reviewForm = useReviewForm(modals.addReview.handle);
    
    // Sync submission state
    if (reviewForm.isSubmitted && !isSubmittedTemp) {
      setIsSubmittedTemp(true);
    }
    
    return reviewForm;
  };

  return {
    useAddReview,
    indexPagination,
    prevCard,
    nextCard,
    getVisibleCards: getVisibleCardsHelper,
    numCardsPreview,
    numberOfPages,
    currentIndex,
    allReviews,
  };
};
