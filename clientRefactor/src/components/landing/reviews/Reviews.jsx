import "./reviews.css";
import { useState, useEffect } from "react";
import { CreateReviews, Review } from "../../index";
import useOpenModel from "../../../hooks/useOpenModel";
import { getReviews } from "../../../utils";
import Swiper from "./Swiper";
//TODO: to move logic of reviews to external functions
const Reviews = () => {
  const [handleAddReview, isOpenAddReview] = useOpenModel();
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const reviews = async () => {
      const { data } = await getReviews();
      setAllReviews(data);
    };
    reviews();
    console.log("model");
  }, [isOpenAddReview]);
  const handelClick = () => {
    handleAddReview();
  };

  return (
    <div id="reviews">
      <h1 className="reviews-header">Reviews</h1>
      {/* not responsive */}
      <Swiper numCardsPreview={4}>
        {allReviews?.map((customer, index) => {
          return <Review customer={customer} key={index} />;
        })}
      </Swiper>

      <button className="btn-add-review" onClick={handelClick}>
        <span>✏️</span>
        Share Your Experience
      </button>

      <CreateReviews handelClick={handleAddReview} isOpen={isOpenAddReview} />
    </div>
  );
};

export default Reviews;
