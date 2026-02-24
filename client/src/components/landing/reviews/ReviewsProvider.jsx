import { ReviewsContext } from "./ReviewsContext";
import { useReviewsModals } from "./hooks/useReviewsModals";
import { useReviewsHandlers } from "./hooks/useReviewsHandlers";
import PropTypes from "prop-types";

export default function ReviewsProvider({ children }) {
  // Modals management
  const modals = useReviewsModals();

  // Reviews handlers
  const reviewsHandlers = useReviewsHandlers(modals);

  const value = {
    useAddReview: reviewsHandlers.useAddReview,
    handleAddReview: modals.addReview.handle,
    isOpenAddReview: modals.addReview.isOpen,
    indexPagination: reviewsHandlers.indexPagination,
    prevCard: reviewsHandlers.prevCard,
    nextCard: reviewsHandlers.nextCard,
    getVisibleCards: reviewsHandlers.getVisibleCards,
    numCardsPreview: reviewsHandlers.numCardsPreview,
    numberOfPages: reviewsHandlers.numberOfPages,
    currentIndex: reviewsHandlers.currentIndex,
    allReviews: reviewsHandlers.allReviews,
  };

  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}

ReviewsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
