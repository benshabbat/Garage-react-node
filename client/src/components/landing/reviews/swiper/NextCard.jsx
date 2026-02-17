import { useReviewsContext } from "../ReviewsContext";


export default function NextCard() {
  const { nextCard, numberOfPages } = useReviewsContext();
  
  // Hide navigation buttons when all cards fit in one view
  if (numberOfPages <= 1) {
    return null;
  }
  
  return (
    <button onClick={nextCard} className="nav-button next-button">
      ❯
    </button>
  );
}
