import { useState } from "react";

/**
 * Custom hook for managing service request form state
 * @returns {Object} Form state and handlers
 */
export const useServiceRequestForm = () => {
  const [formData, setFormData] = useState();

  return {
    formData,
    setFormData,
  };
};
