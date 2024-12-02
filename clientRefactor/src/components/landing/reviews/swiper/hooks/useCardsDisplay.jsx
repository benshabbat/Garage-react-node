import { useState, useEffect } from 'react';


// Screen breakpoints for responsive design
const SCREEN_BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1440,
  };
  
  // Number of cards to show at each breakpoint
  const CARDS_PER_BREAKPOINT = {
    MOBILE: 1,
    TABLET: 2,
    DESKTOP: 3,
    LARGE_DESKTOP: 4,
  };
export default function useCardsDisplay() {
    const [numCardsPreview, setNumCardsPreview] = useState(4);
  
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
  
    useEffect(() => {
      updateNumCards();
      window.addEventListener("resize", updateNumCards);
      return () => window.removeEventListener("resize", updateNumCards);
    }, []);
    
  
    return numCardsPreview;
}
