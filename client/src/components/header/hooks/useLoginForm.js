import { useState } from "react";
import { useAuthStore } from "../../../stores/authStore";

export const useLoginForm = (onLogin) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const login = useAuthStore((s) => s.login);

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    const { isError } = useAuthStore.getState();
    if (!isError) onLogin();
  };

  return { setFormData, onSubmit };
};
