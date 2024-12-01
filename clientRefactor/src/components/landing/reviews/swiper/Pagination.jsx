import { useSwiperContext } from "./SwiperContext";

export default function Pagination() {

  const {currentIndex,indexPagination,totalCards,numCardsPreview} = useSwiperContext()
  return (
    <div className="pagination">
      {Array.from(Math.ceil(totalCards / numCardsPreview))
        .fill()
        .map((_, index) => (
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
