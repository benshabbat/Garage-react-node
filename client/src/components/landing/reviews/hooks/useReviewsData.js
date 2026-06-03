import { useState, useEffect } from "react";
import { getReviews } from "../../../../api/services/reviewApi";

// Refetch only when a review is submitted, not on every modal open/close
export const useReviewsData = (isSubmitted) => {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    getReviews()
      .then((data) => setAllReviews(data || []))
      .catch(() => setAllReviews([]));
  }, [isSubmitted]);

  const totalCards = Array.isArray(allReviews) ? allReviews.length : 0;

  return { allReviews, totalCards };
};
