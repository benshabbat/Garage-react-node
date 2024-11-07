import { useState } from "react";
import "./star-rating.css";
import { useRating } from "./utilsReview";
const StarRating = ({
  maxRating = 5,
  defaultRating = 0,
  onRatingChange,
  size = "medium",
  disabled = false,
}) => {
  const {fontSize,handleClick,stars,mouseOnStar,mouseOffStar,isActive}=useRating(defaultRating,maxRating,disabled,onRatingChange,size);
 
  return (
    <div className="star-rating-container">
      {stars.map((_, index) => {
        const starValue = index + 1;
        

        return (
          <button
            type="button"
            key={starValue}
            className={`star-button ${isActive(starValue) ? "active" : ""} ${
              disabled ? "disabled" : ""
            }`}
            style={{ fontSize }}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => mouseOnStar(starValue)}
            onMouseLeave={mouseOffStar}
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
