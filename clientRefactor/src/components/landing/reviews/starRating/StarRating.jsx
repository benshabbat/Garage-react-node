import "./star-rating.css";
import { useRating } from "../utilsReview";
const StarRating = (props) => {
  const { fontSize, handleClick, stars, mouseOnStar, mouseOffStar, isActive,isDisabled } =
    useRating({...props});

  return (
    <div className="star-rating-container">
      {stars.map((_, index) => {
        const starValue = index + 1;

        return (
          <button
            type="button"
            key={starValue}
            className={`star-button ${isActive(starValue) ? "active" : ""} ${
              isDisabled ? "disabled" : ""
            }`}
            style={{ fontSize }}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => mouseOnStar(starValue)}
            onMouseLeave={mouseOffStar}
            disabled={isDisabled}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
