import { useReviewsHandlers } from "./useReviewsHandlers";
import { useReviewsUIStore } from "../../../../stores/uiStores";

/**
 * Single hook that replaces ReviewsContext — used directly by all reviews sub-components.
 */
export const useReviewsState = () => {
  const addReviewOpen = useReviewsUIStore((s) => s.addReviewOpen);
  const toggleAddReview = useReviewsUIStore((s) => s.toggleAddReview);

  const reviewsHandlers = useReviewsHandlers({ addReview: { isOpen: addReviewOpen, handle: toggleAddReview } });

  return {
    useAddReview: reviewsHandlers.useAddReview,
    handleAddReview: toggleAddReview,
    isOpenAddReview: addReviewOpen,
    indexPagination: reviewsHandlers.indexPagination,
    prevCard: reviewsHandlers.prevCard,
    nextCard: reviewsHandlers.nextCard,
    getVisibleCards: reviewsHandlers.getVisibleCards,
    numCardsPreview: reviewsHandlers.numCardsPreview,
    numberOfPages: reviewsHandlers.numberOfPages,
    currentIndex: reviewsHandlers.currentIndex,
    allReviews: reviewsHandlers.allReviews,
  };
};
