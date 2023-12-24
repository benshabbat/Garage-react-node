import "./reviews.css";
import "react-multi-carousel/lib/styles.css";
import React, { useState, useEffect } from "react";
import { CreateReviews, Review } from "../../index";
import Carousel from "react-multi-carousel";
import useOpenModel from "../../../hooks/useOpenModel";
import { getReviews } from "../../../Utils";
const Reviews = () => {
  const [handleAddReview, isOpenAddReview] = useOpenModel();
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const reviews = async () => {
      const { data } = await getReviews();
      setAllReviews(data);
    };
    reviews();
    console.log("model")
  }, [isOpenAddReview]);
  const handelClick = () => {
    handleAddReview();
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 564 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 564, min: 0 },
      items: 1,
    },
  };
  return (
    <div id="reviews">
      <h1>Reviews</h1>
      <div>
        <Carousel infinite={true} responsive={responsive}>
          {allReviews.map((customer, index) => {
            return <Review customer={customer} key={index} />;
          })}
        </Carousel>
      </div>
      <button className="btn" onClick={handelClick}>
        Add Review
      </button>
      {<CreateReviews handelClick={handleAddReview} isOpen={isOpenAddReview} />}
    </div>
  );
};

export default Reviews;
