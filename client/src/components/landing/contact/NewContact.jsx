import "./newContact.css";
import { useState } from "react";
import { createContact } from "../../../utils";
import FormInput from "../../form/FormInput";
import Submitted from "../../Submitted";

const FIELD_ROWS = [
  [
    { name: "firstName", type: "text",  placeholder: "First Name" },
    { name: "lastName",  type: "text",  placeholder: "Last Name" },
  ],
  [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "phone", type: "tel",   placeholder: "Phone" },
  ],
];
export default function NewContact() {
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContact(formData);
      setIsSubmitted(true);
      setFormData({}); // Reset form
      // Reset form fields
      e.target.reset();
    } catch {
      // submission failed silently - could add user-facing error state here
    }
  };

  if (isSubmitted) {
    return <Submitted setIsSubmitted={setIsSubmitted} />;
  }

  return (
    <div id="contact" className="container-contact">
      <form onSubmit={onSubmit}>
        <h1>Contact Us</h1>
        <div className="input-group">
          {FIELD_ROWS[0].map((field) => (
            <FormInput key={field.name} input={field} handleChange={handleChange} classNameLabel={" "} />
          ))}
        </div>
        <div className="input-group">
          {FIELD_ROWS[1].map((field) => (
            <FormInput key={field.name} input={field} handleChange={handleChange} classNameLabel={" "} />
          ))}
        </div>
        <h4>Type your message here...</h4>
        <textarea name="message" required onChange={handleChange}></textarea>
        <div className="button-container">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
