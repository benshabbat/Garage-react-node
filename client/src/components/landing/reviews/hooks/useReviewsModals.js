import useOpenModal from "../../../../hooks/useOpenModal";

/**
 * Custom hook for managing reviews-related modal states
 * @returns {Object} Modal handlers and states
 */
export const useReviewsModals = () => {
  const [handleAddReview, isOpenAddReview] = useOpenModal();

  return {
    addReview: { isOpen: isOpenAddReview, handle: handleAddReview },
  };
};
