import { useReviewsContext } from "../ReviewsContext";

export default function Pagination() {
  const { currentIndex, indexPagination, numberOfPages, numCardsPreview } =
    useReviewsContext();
    
 
  
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