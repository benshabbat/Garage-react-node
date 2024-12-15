import { useReviewsContext } from "../ReviewsContext";


export default function NextCard() {

  
  const {nextCard} = useReviewsContext()
  return (
    <button onClick={nextCard} className="nav-button next-button">
      ❯
    </button>
  );
}
