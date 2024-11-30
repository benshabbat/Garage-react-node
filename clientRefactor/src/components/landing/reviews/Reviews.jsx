import "./reviews.css";
import { useState, useEffect } from "react";
import { Review } from "../../index";
import { getReviews } from "../../../utils";
import Swiper from "./swiper/Swiper";
import ReviewsProvider from "./ReviewsProvider";
import AddReview from "./AddReview";

//TODO:CONTEXT AND PROVIDER
const Reviews = () => {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const reviews = async () => {
      const { data } = await getReviews();
      setAllReviews(data);
    };
    reviews();
  }, []);

  return (
    <ReviewsProvider>
      <div id="reviews">
        <h1 className="reviews-header">Reviews</h1>
        <Swiper numCardsPreview={4}>
          {allReviews?.map((customer, index) => (
            <Review customer={customer} key={index} />
          ))}
        </Swiper>
        <AddReview />
      </div>
    </ReviewsProvider>
  );
};

export default Reviews;
