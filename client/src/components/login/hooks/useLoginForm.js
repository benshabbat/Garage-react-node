import { useState } from "react";
import { useAuthStore } from "../../../stores/authStore";

export function useLoginForm() {
  const isError = useAuthStore((s) => s.isError);
  const message = useAuthStore((s) => s.message);
  const login = useAuthStore((s) => s.login);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return { formData, handleChange, onSubmit, isError, message };
}
