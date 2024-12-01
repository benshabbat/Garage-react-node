import "./reviews.css";
import Swiper from "./swiper/Swiper";
import useOpenModal from "../../../hooks/useOpenModal";
import { getReviews } from "../../../utils";
import { useState, useEffect } from "react";
import { CreateReviews, Review } from "../../index";

//TODO:CONTEXT AND PROVIDER
const Reviews = () => {
  const [handleAddReview, isOpenAddReview] = useOpenModal();
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const reviews = async () => {
      const { data } = await getReviews();
      setAllReviews(data);
    };
    reviews();
  }, [isOpenAddReview]);

  const handelClick = () => {
    handleAddReview();
  };

  return (
    <div id="reviews">
      <h1 className="reviews-header">Reviews</h1>
      <Swiper>
        {allReviews?.map((customer, index) => (
          <Review customer={customer} key={index} />
        ))}
      </Swiper>
      <button className="btn-add-review" onClick={handelClick}>
        Share Your Experience
      </button>
      <CreateReviews handelClick={handleAddReview} isOpen={isOpenAddReview} />
    </div>
  );
};

export default Reviews;
