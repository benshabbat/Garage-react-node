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

  const FONT_SIZE = { small: "20px", large: "36px" };
  const fontSize = FONT_SIZE[size] ?? "28px";

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
    isDisabled: disabled,
  };
}
