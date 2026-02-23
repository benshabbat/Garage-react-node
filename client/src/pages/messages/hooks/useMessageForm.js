import { useState } from "react";

/**
 * Custom hook for managing message form state
 * @param {Object} user - Current user (for default from field)
 * @returns {Object} Form state and handlers
 */
export const useMessageForm = (user) => {
  const [formData, setFormData] = useState({
    from: user?._id,
  });

  return {
    formData,
    setFormData,
  };
};
