import React, { useRef, useState, useEffect } from "react";
import { Rating } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { OpenModel } from "../../index";
import { createReview } from "../../../Utils";
const CreateReviews = ({ handelClick, isOpen }) => {
  const nameRef = useRef();
  const descRef = useRef();
  const numRef = useRef();
  const maxLength = 80;
  const [stars, setStars] = useState(5);
  const [formData, setFormData] = useState(undefined);
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
    if (formData !== undefined) {
      const newReview = async () => {
        await createReview(formData);
      };
      newReview();
    }
    setFormData(undefined);
  }, [formData]);

  return (
    <OpenModel
      comp={
        <form className="form">
          <CancelIcon onClick={handelClick} className="form-close" />
          <h1>garage review</h1>
          <label className="form-label">
            <Rating
              style={{ fontSize: 45, top: "15px" }}
              value={stars}
              onChange={(event, newstars) => {
                setStars(newstars);
              }}
            />
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
