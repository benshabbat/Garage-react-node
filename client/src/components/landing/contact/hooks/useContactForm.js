import { useState } from "react";
import { createContact } from "../../../../utils";

export function useContactForm() {
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      await createContact(formData);
      setIsSubmitted(true);
      setFormData({});
      e.target.reset();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return { isSubmitted, setIsSubmitted, submitError, handleChange, onSubmit };
}
