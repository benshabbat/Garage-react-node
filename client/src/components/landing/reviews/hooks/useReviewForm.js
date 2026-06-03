import { useState, useEffect, useRef } from "react";
import { createReview } from "../../../../api/services/reviewApi";

export const useReviewForm = (handleAddReview, onSubmitSuccess) => {
  const [stars, setStars] = useState(5);
  const [formData, setFormData] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const nameRef = useRef();
  const descRef = useRef();

  const addReview = (e) => {
    e.preventDefault();
    setSubmitError(null);
    setFormData({
      name: nameRef.current.value,
      description: descRef.current.value,
      stars,
    });
    setIsSubmitted(true);
    handleAddReview();
    onSubmitSuccess?.();
  };

  useEffect(() => {
    if (!formData) return;
    createReview(formData).catch((err) => {
      setSubmitError(err.response?.data?.message ?? err.message);
      setIsSubmitted(false);
    });
  }, [formData]);

  return { addReview, setStars, nameRef, descRef, isSubmitted, setIsSubmitted, submitError };
};
