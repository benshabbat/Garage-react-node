import { useReviewsContext } from "../ReviewsContext";

export default function Pagination() {
  const { currentIndex, indexPagination, totalCards, numCardsPreview } =
    useReviewsContext();
    
  const numberOfPages = Math.ceil(totalCards / numCardsPreview);
  
  return (
    <div className="pagination">
      {Array.from({ length: numberOfPages }, (_, index) => (
        <button
          key={index}
          className={`dot ${
            Math.floor(currentIndex / numCardsPreview) === index
              ? "active"
              : ""
          }`}
          onClick={() => indexPagination(index)}
        />
      ))}
    </div>
  );
}