import "./reviews.css";
import { useState, useEffect } from "react";
import { CreateReviews, Review } from "../../index";
import useOpenModal from "../../../hooks/useOpenModal";
import { getReviews } from "../../../utils";
import Swiper from "./Swiper";

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

  // קביעת מספר הכרטיסים בהתאם לרוחב המסך
  const getNumCardsPreview = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1440) return 3;
    return 4;
  };

  const [numCards, setNumCards] = useState(getNumCardsPreview());

  useEffect(() => {
    const handleResize = () => {
      setNumCards(getNumCardsPreview());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="reviews">
      <h1 className="reviews-header">Reviews</h1>
      <Swiper numCardsPreview={numCards}>
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
