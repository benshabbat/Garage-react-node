import { useState } from "react";

export function useFormState(setData, onSubmit) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSubmit(e);
  };

  return { isSubmitted, handleChange, handleFormSubmit };
}
