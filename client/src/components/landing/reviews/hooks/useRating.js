import { useState } from "react";

/**
 * Custom hook for rating component functionality
 * @param {Object} options - Configuration options
 * @param {number} options.defaultRating - Initial rating value (default: 0)
 * @param {number} options.maxRating - Maximum rating value (default: 5)
 * @param {boolean} options.disabled - Whether rating is disabled (default: false)
 * @param {Function} options.onRatingChange - Callback when rating changes
 * @param {string} options.size - Size variant: 'small', 'medium', 'large' (default: 'medium')
 * @returns {Object} Rating state and handlers
 */
export function useRating({
  defaultRating = 0,
  maxRating = 5,
  disabled = false,
  onRatingChange,
  size = "medium",
}) {
  const [rating, setRating] = useState(defaultRating);
  const [hover, setHover] = useState(0);
  const stars = [...Array(maxRating)];
  const isDisabled = disabled;
  
  const getFontSize = () => {
    switch (size) {
      case "small":
        return "20px";
      case "large":
        return "36px";
      default:
        return "28px";
    }
  };
  
  const fontSize = getFontSize();

  const handleClick = (value) => {
    if (!disabled) {
      setRating(value);
      if (onRatingChange) {
        onRatingChange(value);
      }
    }
  };

  const isActive = (starValue) => (hover || rating) >= starValue;

  const mouseOnStar = (starValue) => !disabled && setHover(starValue);
  const mouseOffStar = () => !disabled && setHover(0);

  return {
    fontSize,
    handleClick,
    stars,
    mouseOnStar,
    mouseOffStar,
    isActive,
    isDisabled,
  };
}
