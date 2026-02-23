import { useState, useEffect } from "react";

/**
 * Custom hook for managing service form state
 * @param {Object} initialData - Initial form data
 * @returns {Object} Form state and handlers
 */
export const useServiceForm = (initialData = null) => {
  const [formData, setFormData] = useState(initialData);

  // Reset form data when initial data changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return {
    formData,
    setFormData,
  };
};
