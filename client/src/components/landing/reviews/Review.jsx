import StarRating from "./StarRating";
import { getMomentFromUpdatedAt } from "./utilsReview";
const Review = ({ customer }) => {
  const { theTimeAgo } = getMomentFromUpdatedAt(customer.updatedAt);

  return (
    <div className="one-review">
      {console.log(customer)}
      <h1>{customer.name}</h1>
      <StarRating defaultRating={customer.stars} disabled={true} />
      <div className="desc">{customer.description}</div>
      <div className="time">{theTimeAgo}</div>
    </div>
  );
};

export default Review;
