import { useReviewsContext } from "../ReviewsContext";
import { useState, useEffect } from 'react';

export default function Pagination() {
  const { currentIndex, indexPagination, numberOfPages, numCardsPreview } = useReviewsContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;
  
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