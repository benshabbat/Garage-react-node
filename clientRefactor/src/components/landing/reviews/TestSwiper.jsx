import "./testSwiper.css"
import { useState, useCallback } from 'react';

const TestSwiper = ({ children, numCardsPreview = 1 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = children?.length || 0;
  const maxIndex = Math.max(0, totalItems - numCardsPreview);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(current => Math.max(0, current - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex(current => Math.min(maxIndex, current + 1));
  }, [maxIndex]);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper" 
           style={{ 
             transform: `translateX(-${currentIndex * (100 / numCardsPreview)}%)`,
           }}>
        {children?.map((child, index) => (
          <div 
            key={index} 
            className="swiper-slide"
            style={{ flex: `0 0 ${100 / numCardsPreview}%` }}
          >
            {child}
          </div>
        ))}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={goToPrevious}
          className="swiper-button swiper-button-prev"
          aria-label="Previous slide"
        >
          &#8592;
        </button>
      )}

      {currentIndex < maxIndex && (
        <button
          onClick={goToNext}
          className="swiper-button swiper-button-next"
          aria-label="Next slide"
        >
          &#8594;
        </button>
      )}

      <div className="swiper-pagination">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`swiper-pagination-bullet ${
              index === currentIndex ? 'swiper-pagination-bullet-active' : ''
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestSwiper;