import { memo, useState } from "react";
import PropTypes from "prop-types";
import StarRating from "./starRating/StarRating";
import { getMomentFromUpdatedAt } from "../../../utils/dateUtils";

const MAX_CHARS = 100;

const Review = memo(({ customer }) => {
  const { theTimeAgo, theDate } = getMomentFromUpdatedAt(customer.updatedAt);
  const [expanded, setExpanded] = useState(false);

  const isLong = customer.description.length > MAX_CHARS;
  const displayText =
    isLong && !expanded ? customer.description.slice(0, MAX_CHARS) + "…" : customer.description;

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-avatar">{customer.name.charAt(0).toUpperCase()}</div>
        <div className="review-info">
          <h3 className="review-name">{customer.name}</h3>
          <div className="review-date">{theDate}</div>
        </div>
      </div>

      <div className="review-rating">
        <StarRating defaultRating={customer.stars} disabled={true} />
        <span className="review-stars-text">{customer.stars}/5</span>
      </div>

      <p className="review-description">
        {displayText}
        {isLong && (
          <button
            className="review-see-more"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
          >
            {expanded ? " see less" : " see more"}
          </button>
        )}
      </p>

      <div className="review-footer">
        <span className="review-time">{theTimeAgo}</span>
      </div>
    </div>
  );
});

Review.propTypes = {
  customer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

Review.displayName = "Review";

export default Review;
