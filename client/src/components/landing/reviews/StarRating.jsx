import { useState } from "react";
import "./star-rating.css";

const StarRating = ({
  maxRating = 5,
  defaultRating = 0,
  onRatingChange,
  size = "medium",
  disabled = false,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [hover, setHover] = useState(0);

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

  const handleClick = (value) => {
    if (!disabled) {
      setRating(value);
      if (onRatingChange) {
        onRatingChange(value);
      }
    }
  };

  return (
    <div className="star-rating-container">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isActive = (hover || rating) >= starValue;

        return (
          <button
            type="button"
            key={starValue}
            className={`star-button ${isActive ? "active" : ""} ${
              disabled ? "disabled" : ""
            }`}
            style={{ fontSize: getFontSize() }}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => !disabled && setHover(starValue)}
            onMouseLeave={() => !disabled && setHover(0)}
            disabled={disabled}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
