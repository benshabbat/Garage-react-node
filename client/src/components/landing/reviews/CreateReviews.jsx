import React, { useRef, useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { OpenModel } from "../../index";
import { createReview } from "../../../utils";
import StarRating from "./StarRating";
const CreateReviews = ({ handelClick, isOpen }) => {
  const nameRef = useRef();
  const descRef = useRef();
  const numRef = useRef();
  const maxLength = 80;
  const [stars, setStars] = useState(5);
  const [formData, setFormData] = useState();
  const addReview = (e) => {
    e.preventDefault();
    setFormData({
      name: nameRef.current.value,
      description: descRef.current.value,
      stars,
    });
    handelClick();
  };

  useEffect(() => {
    if (formData) {
      const newReview = async () => {
        await createReview(formData);
      };
      newReview();
    }
    setFormData();
  }, [formData]);

  return (
    <OpenModel
      comp={
        <form className="form">
          <CancelIcon onClick={handelClick} className="form-close" />
          <h1>garage review</h1>
          <label className="form-label">
            <StarRating onRatingChange={(value) => setStars(value)} />
          </label>
          <label className="form-label">
            <span>Name</span>
            <input
              autoFocus
              ref={nameRef}
              type="text"
              title="Name"
              placeholder="type your name.."
            />
          </label>
          <label className="form-label">
            <span>Description </span>
            <textarea
              ref={descRef}
              maxLength={maxLength}
              type="text"
              title="Description"
              row={8}
              placeholder={`Write your review (max ${maxLength} chart)`}
              onChange={(e) =>
                (numRef.current.value =
                  maxLength - descRef.current.value.length)
              }
            />
            <input className="num" ref={numRef} value={maxLength} readOnly />
          </label>
          <button className="form-btn" onClick={addReview}>
            Add Reviews
          </button>
        </form>
      }
      isOpen={isOpen}
    />
  );
};

export default CreateReviews;
