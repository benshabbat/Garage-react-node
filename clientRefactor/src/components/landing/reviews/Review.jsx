import moment from "moment";
import StarRating from "./StarRating";
const Review = ({ customer }) => {
  return (
    <div className="one-review" >
      <h1>{customer.name}</h1>
      <StarRating defaultRating={customer.stars} disabled={true}/>
      <div className="desc">{customer.description}</div>
      <div className="time">
        {moment(customer.updatedAt).startOf("ss").fromNow()}
      </div>
    </div>
  );
};

export default Review;
