import { useState, useEffect } from "react";
import { ReviewsContext } from "./ReviewsContext";
import useOpenModal from "../../../hooks/useOpenModal";
import { getReviews } from "../../../utils";
import useCardsDisplay from "./swiper/hooks/useCardsDisplay";



export default function ReviewsProvider({ children }) {
  const [handleAddReview, isOpenAddReview] = useOpenModal();
  // State for current slide index and number of cards to display
  const [currentIndex, setCurrentIndex] = useState(0);

  const [allReviews, setAllReviews] = useState([]);
  const numCardsPreview = useCardsDisplay()
  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await getReviews();
      setAllReviews(data);
    };
    fetchReviews();
  }, []);
  const totalCards = allReviews.length;




  // Get currently visible cards based on index and number of cards to show
  const getVisibleCards = (children) => {
    if (!Array.isArray(children)) {
      return children;
    }
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + numCardsPreview, children.length);
    return children.slice(startIndex, endIndex);
  };

  // Handle navigation to next set of cards
  const nextCard = () => {
    setCurrentIndex((prev) => (prev + numCardsPreview) % allReviews.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - numCardsPreview;
      return newIndex < 0
        ? Math.floor((allReviews.length - 1) / numCardsPreview) *
            numCardsPreview
        : newIndex;
    });
  };

  // Handle pagination dot click
  const indexPagination = (index) => {
    setCurrentIndex(index * numCardsPreview);
  };

  const value = {
    handleAddReview,
    isOpenAddReview,
    indexPagination,
    prevCard,
    nextCard,
    getVisibleCards,
    totalCards,
    numCardsPreview,
    currentIndex,
    allReviews,
  };
  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}
