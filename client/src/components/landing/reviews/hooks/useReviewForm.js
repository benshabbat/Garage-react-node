import { useState, useEffect, useRef } from "react";
import { createReview } from "../../../../utils";

/**
 * Custom hook for managing review form
 * @param {Function} handleAddReview - Callback to close modal
 * @returns {Object} Review form state and handlers
 */
export const useReviewForm = (handleAddReview) => {
  const [stars, setStars] = useState(5);
  const [formData, setFormData] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const nameRef = useRef();
  const descRef = useRef();

  const addReview = (e) => {
    e.preventDefault();
    setFormData({
      name: nameRef.current.value,
      description: descRef.current.value,
      stars,
    });
    setIsSubmitted(true);
    handleAddReview();
  };

  useEffect(() => {
    if (formData) {
      const newReview = async () => {
        await createReview(formData);
      };
      newReview();
    }
  }, [formData]);

  return { 
    addReview, 
    setStars, 
    nameRef, 
    descRef, 
    isSubmitted, 
    setIsSubmitted 
  };
};
