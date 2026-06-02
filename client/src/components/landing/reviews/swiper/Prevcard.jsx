import { useReviewsState as useReviewsContext } from "../hooks/useReviewsState";

export default function PrevCard (){
  const {prevCard} = useReviewsContext()
    return (
      <button onClick={prevCard} className="nav-button prev-button">
        ❮
      </button>
    );
  };
