import "./reviews.css";
import React, { useState, useEffect } from "react";
import { CreateReviews, Review } from "../../index";
import useOpenModel from "../../../hooks/useOpenModel";
import { getReviews } from "../../../utils";
import CardSwiper from "./CardSwiper";
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
      <h1>Reviews</h1>
      <div className="reviews-container">
        <CardSwiper>
        {allReviews?.map((customer, index) => {
            return <Review customer={customer} key={index} />;
          })}
        </CardSwiper>
      </div>
      <button className="btn-review" onClick={handelClick}>
        Add Review
      </button>
      {<CreateReviews handelClick={handleAddReview} isOpen={isOpenAddReview} />}
    </div>
  );
};

export default Reviews;
