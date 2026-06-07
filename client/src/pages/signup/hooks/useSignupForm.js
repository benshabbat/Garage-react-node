import { useState, useEffect } from "react";
import { useAuthStore } from "../../../stores/authStore";

export function useSignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const signup = useAuthStore((s) => s.signup);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isSuccess = useAuthStore((s) => s.isSuccess);
  const isError = useAuthStore((s) => s.isError);
  const message = useAuthStore((s) => s.message);
  const reset = useAuthStore((s) => s.reset);

  // Reset auth flags on unmount so re-visiting doesn't show stale success screen
  useEffect(() => () => reset(), [reset]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (isError) reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return { formData, isLoading, isSuccess, isError, message, handleChange, handleSubmit };
}
