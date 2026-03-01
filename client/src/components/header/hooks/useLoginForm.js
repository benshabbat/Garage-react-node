import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../features/auth/authSlice";

/**
 * Custom hook for managing login form
 * @param {Function} onLogin - Callback to close modal after login
 * @returns {Object} Login form state and handlers
 */
export const useLoginForm = (onLogin) => {
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      onLogin();
    } catch {
      // error is handled in Redux state (isError / message)
    }
  };

  return { setFormData, onSubmit };
};
