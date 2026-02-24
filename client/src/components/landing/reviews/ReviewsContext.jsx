import { createContext } from "react";
import { createContextHook } from "../../context/useContextGeneric";

export const ReviewsContext = createContext(null);

export const useReviewsContext = createContextHook(ReviewsContext, "useReviewsContext");
