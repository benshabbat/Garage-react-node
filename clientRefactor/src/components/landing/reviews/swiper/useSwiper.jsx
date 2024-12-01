import { useState, useEffect } from "react";

export function useSwiper(children) {
  // State for current slide index and number of cards to display
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numCardsPreview, setNumCardsPreview] = useState(4);
  const totalCards = children.length;

  // Screen breakpoints for responsive design
  const SCREEN_BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1440
  };

  // Number of cards to show at each breakpoint
  const CARDS_PER_BREAKPOINT = {
    MOBILE: 1,
    TABLET: 2,
    DESKTOP: 3,
    LARGE_DESKTOP: 4
  };

  useEffect(() => {
    // Update number of cards based on screen width
    const updateNumCards = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < SCREEN_BREAKPOINTS.MOBILE) {
        setNumCardsPreview(CARDS_PER_BREAKPOINT.MOBILE);
      } else if (screenWidth < SCREEN_BREAKPOINTS.TABLET) {
        setNumCardsPreview(CARDS_PER_BREAKPOINT.TABLET);
      } else if (screenWidth < SCREEN_BREAKPOINTS.DESKTOP) {
        setNumCardsPreview(CARDS_PER_BREAKPOINT.DESKTOP);
      } else {
        setNumCardsPreview(CARDS_PER_BREAKPOINT.LARGE_DESKTOP);
      }
    };

    // Initial setup
    updateNumCards();

    // Update on resize
    window.addEventListener('resize', updateNumCards);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateNumCards);
  }, []);

  // Get currently visible cards based on index and number of cards to show
  const getVisibleCards = () => {
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + numCardsPreview, totalCards);
    return children.slice(startIndex, endIndex);
  };

  // Handle navigation to next set of cards
  const nextCard = () => {
    const isLastSet = currentIndex + numCardsPreview >= totalCards;
    
    if (isLastSet) {
      // If at the end, go back to start
      setCurrentIndex(0);
    } else {
      // Move forward by numCardsPreview
      setCurrentIndex(prev => prev + numCardsPreview);
    }
  };

  // Handle navigation to previous set of cards
  const prevCard = () => {
    const isFirstSet = currentIndex - numCardsPreview < 0;
    
    if (isFirstSet) {
      // If at the start, go to last possible set
      const lastGroupStart = Math.floor((totalCards - 1) / numCardsPreview) * numCardsPreview;
      setCurrentIndex(lastGroupStart);
    } else {
      // Move backward by numCardsPreview
      setCurrentIndex(prev => prev - numCardsPreview);
    }
  };

  // Handle pagination dot click
  const indexPagination = (index) => {
    const newStartIndex = index * numCardsPreview;
    setCurrentIndex(newStartIndex);
  };

  // Navigation button components
  const PrevCard = () => (
    <button onClick={prevCard} className="nav-button prev-button">
      ❮
    </button>
  );

  const NextCard = () => (
    <button onClick={nextCard} className="nav-button next-button">
      ❯
    </button>
  );

  // Pagination component
  const Pagination = () => {
    const totalPages = Math.ceil(totalCards / numCardsPreview);
    const currentPage = Math.floor(currentIndex / numCardsPreview);

    return (
      <div className="pagination">
        {Array(totalPages)
          .fill()
          .map((_, index) => (
            <button
              key={index}
              className={`dot ${currentPage === index ? "active" : ""}`}
              onClick={() => indexPagination(index)}
            />
          ))}
      </div>
    );
  };

  // Slides container component
  const Slides = ({ children }) => (
    <div className="swiper-slides">{getVisibleCards(children)}</div>
  );

  // Return all necessary components and handlers
  return { Slides, Pagination, NextCard, PrevCard };
}