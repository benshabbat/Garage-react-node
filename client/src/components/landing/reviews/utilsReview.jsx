import { useState } from "react";


//TODO:imporve this file maybe destructure to files

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


