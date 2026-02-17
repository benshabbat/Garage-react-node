import { useReviewsContext } from "../ReviewsContext";

export default function PrevCard() {
  const { prevCard, numberOfPages } = useReviewsContext();
  
  // Hide navigation buttons when all cards fit in one view
  if (numberOfPages <= 1) {
    return null;
  }
  
  return (
    <button onClick={prevCard} className="nav-button prev-button">
      ❮
    </button>
  );
};
