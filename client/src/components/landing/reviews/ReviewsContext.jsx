import { createContext, useContext } from "react";

export const ReviewsContext = createContext(null);

export const useReviewsContext = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviewsContext must be used within a ReviewsProvider");
  }
  return context;
};
