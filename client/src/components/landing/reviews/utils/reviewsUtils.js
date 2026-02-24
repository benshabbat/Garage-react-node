/**
 * Get currently visible cards based on index and number of cards to show
 * @param {Array} children - All card children
 * @param {number} currentIndex - Current starting index
 * @param {number} numCardsPreview - Number of cards to display
 * @param {number} totalCards - Total number of cards
 * @returns {Array} Visible cards
 */
export const getVisibleCards = (children, currentIndex, numCardsPreview, totalCards) => {
  if (!Array.isArray(children)) {
    return children;
  }
  const startIndex = currentIndex;
  const endIndex = Math.min(startIndex + numCardsPreview, totalCards);
  return children.slice(startIndex, endIndex);
};

/**
 * Calculate number of pagination pages
 * @param {number} totalCards - Total number of cards
 * @param {number} numCardsPreview - Number of cards per page
 * @returns {number} Number of pages
 */
export const calculateNumberOfPages = (totalCards, numCardsPreview) => {
  return Math.ceil(totalCards / numCardsPreview);
};
