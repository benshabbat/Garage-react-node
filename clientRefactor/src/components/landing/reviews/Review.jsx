// Review.jsx
import { memo } from "react";
import PropTypes from "prop-types";
import StarRating from "./StarRating";
import { getMomentFromUpdatedAt } from "./utilsReview.jsx";
import "./reviews.css";

const Review = memo(({ customer }) => {
  const { theTimeAgo, theDate } = getMomentFromUpdatedAt(customer.updatedAt);

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-avatar">
          {customer.avatar || customer.name.charAt(0).toUpperCase()}
        </div>
        <div className="review-info">
          <h3 className="review-name">{customer.name}</h3>
          <div className="review-date">{theDate}</div>
        </div>
      </div>
      
      <div className="review-rating">
        <StarRating defaultRating={customer.stars} disabled={true} />
        <span className="review-stars-text">{customer.stars}/5</span>
      </div>

      <div className="review-content">
        <p className="review-description">{customer.description}</p>
      </div>

      <div className="review-footer">
        <span className="review-time">{theTimeAgo}</span>
        {customer.verified && (
          <span className="review-verified">✓ Verified Customer</span>
        )}
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
    avatar: PropTypes.string,
    verified: PropTypes.bool
  }).isRequired
};

Review.displayName = "Review";

export default Review;