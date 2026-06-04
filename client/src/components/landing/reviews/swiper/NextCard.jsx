import { useReviewsState as useReviewsContext } from "../hooks/useReviewsState";


export default function NextCard() {

  
  const {nextCard} = useReviewsContext()
  return (
    <button onClick={nextCard} className="nav-button next-button" aria-label="Next review">
      ❯
    </button>
  );
}
