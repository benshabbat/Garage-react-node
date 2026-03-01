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

  // Run duplicate checks whenever formData actually changes.
  // Using useEffect here avoids the bug where setFormDataWithValidation
  // was called with a functional updater (prevState => ...) instead of
  // the new data object — making newData.username always undefined.
  useEffect(() => {
    if (isModalOpen && formData) {
      setIsExistEmail(checkDuplicateEmail(users, formData.email, excludeUserId));
      setIsExistPhone(checkDuplicatePhone(users, formData.phone, excludeUserId));
      setIsExistUser(checkDuplicateUsername(users, formData.username, excludeUserId));
    }
  }, [formData, isModalOpen, users, excludeUserId]);

  // Reset validation state
  const resetValidation = () => {
    setIsExistEmail(false);
    setIsExistPhone(false);
    setIsExistUser(false);
  };

  return {
    formData,
    setFormData,
    isExistEmail,
    isExistPhone,
    isExistUser,
    resetValidation,
  };
};
