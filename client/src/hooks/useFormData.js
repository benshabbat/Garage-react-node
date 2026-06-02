import { useState, useEffect } from "react";

export const useFormData = (initialData = null) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return { formData, setFormData };
};
