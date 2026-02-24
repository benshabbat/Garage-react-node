import { useState, useEffect } from "react";
import { getReviews } from "../../../../utils";

/**
 * Custom hook for managing reviews data
 * @param {boolean} isOpenAddReview - Modal open state
 * @param {boolean} isSubmitted - Form submission state
 * @returns {Object} Reviews data and state
 */
export const useReviewsData = (isOpenAddReview, isSubmitted) => {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setAllReviews(data || []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setAllReviews([]); // Initialize to empty array on error
      }
    };
    fetchReviews();
  }, [isOpenAddReview, isSubmitted]);

  const totalCards = Array.isArray(allReviews) ? allReviews.length : 0;

  return { allReviews, totalCards };
};
