export default function Pagination() {
  return (
    <div className="pagination">
      {Array(Math.ceil(totalCards / numCardsPreview))
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
