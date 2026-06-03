import { useState } from "react";
import { createContact } from "../../../../utils";

export function useContactLegacyForm() {
  const [formData, setFormData] = useState({ from: "", title: "", description: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    await createContact(formData);
  };

  return { formData, setFormData, onSubmit };
}
