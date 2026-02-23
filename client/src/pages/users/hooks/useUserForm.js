import { useState, useEffect } from "react";
import {
  checkDuplicateEmail,
  checkDuplicatePhone,
  checkDuplicateUsername,
} from "../utils/userValidation";

/**
 * Custom hook for managing user form state with validation
 * @param {Array} users - List of all users
 * @param {Object} initialData - Initial form data
 * @param {boolean} isModalOpen - Whether modal is open
 * @param {string} excludeUserId - User ID to exclude from duplicate checks (for edit mode)
 * @returns {Object} Form state and handlers
 */
export const useUserForm = (users, initialData = null, isModalOpen = false, excludeUserId = null) => {
  const [formData, setFormData] = useState(initialData);
  const [isExistEmail, setIsExistEmail] = useState(false);
  const [isExistPhone, setIsExistPhone] = useState(false);
  const [isExistUser, setIsExistUser] = useState(false);

  // Reset form data when initial data changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Validate form data on change
  const setFormDataWithValidation = (newData) => {
    setFormData(newData);
    
    if (isModalOpen && newData) {
      setIsExistEmail(checkDuplicateEmail(users, newData.email, excludeUserId));
      setIsExistPhone(checkDuplicatePhone(users, newData.phone, excludeUserId));
      setIsExistUser(checkDuplicateUsername(users, newData.username, excludeUserId));
    }
  };

  // Reset validation state
  const resetValidation = () => {
    setIsExistEmail(false);
    setIsExistPhone(false);
    setIsExistUser(false);
  };

  return {
    formData,
    setFormData: setFormDataWithValidation,
    isExistEmail,
    isExistPhone,
    isExistUser,
    resetValidation,
  };
};
