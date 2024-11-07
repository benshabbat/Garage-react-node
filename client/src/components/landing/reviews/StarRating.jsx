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
  const stars = [...Array(maxRating)];
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
  const fontSize = getFontSize()

  const handleClick = (value) => {
    if (!disabled) {
      setRating(value);
      console.log(`set rating ${value}`);
      if (onRatingChange) {
        onRatingChange(value);
        console.log(`set rating change ${value}`);
      }
    }
  };

  return (
    <div className="star-rating-container">
      {stars.map((_, index) => {
        const starValue = index + 1;
        const isActive = (hover || rating) >= starValue;

        return (
          <button
            type="button"
            key={starValue}
            className={`star-button ${isActive ? "active" : ""} ${
              disabled ? "disabled" : ""
            }`}
            style={{ fontSize }}
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
