import { useRef, useState, useEffect } from "react";
import { ReviewsContext } from "./ReviewsContext";
import { getReviews, createReview } from "../../../utils";

import useOpenModal from "../../../hooks/useOpenModal";
import useCardsDisplay from "./swiper/hooks/useCardsDisplay";
import useCardsNavigation from "./swiper/hooks/useCardsNavigation";

export default function ReviewsProvider({ children }) {
  const [handleAddReview, isOpenAddReview] = useOpenModal();
  
  const [allReviews, setAllReviews] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalCards = Array.isArray(allReviews) ? allReviews.length : 0;

  const cardsPreview = useCardsDisplay();
  // Limit the number of cards to display to the total number of cards available
  const numCardsPreview = Math.min(cardsPreview, totalCards || cardsPreview);
  const { currentIndex, nextCard, prevCard, indexPagination } =
    useCardsNavigation(numCardsPreview, totalCards);
  const numberOfPages = Math.ceil(totalCards / numCardsPreview);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setAllReviews(data || []); // ודא ש-`data` הוא מערך
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setAllReviews([]); // במקרה של שגיאה, אתחל למערך ריק
      }
    };
    fetchReviews();
  }, [isOpenAddReview, isSubmitted]);

  // Get currently visible cards based on index and number of cards to show
  const getVisibleCards = (children) => {
    if (!Array.isArray(children)) {
      return children;
    }
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + numCardsPreview, totalCards);
    return children.slice(startIndex, endIndex);
  };

  const useAddReview = () => {
    const [stars, setStars] = useState(5);
    const [formData, setFormData] = useState();
    const nameRef = useRef();
    const descRef = useRef();
    const addReview = (e) => {
      e.preventDefault();
      setFormData({
        name: nameRef.current.value,
        description: descRef.current.value,
        stars,
      });
      setIsSubmitted(true);
      handleAddReview();
    };

    useEffect(() => {
      if (formData) {
        const newReview = async () => {
          await createReview(formData);
        };
        newReview();
      }
    }, [formData]);

    return { addReview, setStars, nameRef, descRef,isSubmitted,setIsSubmitted };
  };

  const value = {
    useAddReview,
    handleAddReview,
    isOpenAddReview,
    indexPagination,
    prevCard,
    nextCard,
    getVisibleCards,
    // totalCards,
    numCardsPreview,
    numberOfPages,
    currentIndex,
    allReviews,
  };
  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}
