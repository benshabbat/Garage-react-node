import { useState, useEffect } from "react";
import { getReviews } from "../../../../api/services/reviewApi";

// Refetch only when a review is submitted, not on every modal open/close
export const useReviewsData = (isSubmitted) => {
  const [allReviews, setAllReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getReviews()
      .then((data) => setAllReviews(data || []))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [isSubmitted]);

  const totalCards = Array.isArray(allReviews) ? allReviews.length : 0;

  return { allReviews, totalCards, isLoading, isError };
};
