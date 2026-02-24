import { useState } from "react";
import { ReviewsContext } from "./ReviewsContext";
import useOpenModal from "../../../hooks/useOpenModal";
import useCardsDisplay from "./swiper/hooks/useCardsDisplay";
import useCardsNavigation from "./swiper/hooks/useCardsNavigation";
import { useReviewForm } from "./hooks/useReviewForm";
import { useReviewsData } from "./hooks/useReviewsData";
import { getVisibleCards, calculateNumberOfPages } from "./utils/reviewsUtils";
import PropTypes from "prop-types";

export default function ReviewsProvider({ children }) {
  const [handleAddReview, isOpenAddReview] = useOpenModal();
  
  // Temporary state for form submission tracking
  const [isSubmittedTemp, setIsSubmittedTemp] = useState(false);
  
  // Get reviews data
  const { allReviews, totalCards } = useReviewsData(isOpenAddReview, isSubmittedTemp);

  // Cards display and navigation
  const numCardsPreview = useCardsDisplay();
  const { currentIndex, nextCard, prevCard, indexPagination } =
    useCardsNavigation(numCardsPreview, totalCards);
  const numberOfPages = calculateNumberOfPages(totalCards, numCardsPreview);

  // Helper function to get visible cards
  const getVisibleCardsHelper = (children) => {
    return getVisibleCards(children, currentIndex, numCardsPreview, totalCards);
  };

  // Hook for adding review
  const useAddReview = () => {
    const reviewForm = useReviewForm(handleAddReview);
    
    // Sync submission state
    if (reviewForm.isSubmitted && !isSubmittedTemp) {
      setIsSubmittedTemp(true);
    }
    
    return reviewForm;
  };

  const value = {
    useAddReview,
    handleAddReview,
    isOpenAddReview,
    indexPagination,
    prevCard,
    nextCard,
    getVisibleCards: getVisibleCardsHelper,
    numCardsPreview,
    numberOfPages,
    currentIndex,
    allReviews,
  };
  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}

ReviewsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
