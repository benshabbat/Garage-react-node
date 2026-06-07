import "./newContact.css";
import FormInput from "../../form/FormInput";
import Submitted from "../../Submitted";
import { useContactForm } from "./hooks/useContactForm";

const FIELD_ROWS = [
  [
    { name: "firstName", type: "text", placeholder: "First Name" },
    { name: "lastName", type: "text", placeholder: "Last Name" },
  ],
  [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "phone", type: "tel", placeholder: "Phone" },
  ],
];
export default function NewContact() {
  const { isSubmitted, setIsSubmitted, submitError, handleChange, onSubmit } = useContactForm();

  if (isSubmitted) {
    return <Submitted setIsSubmitted={setIsSubmitted} />;
  }

  return (
    <div id="contact" className="container-contact">
      <form onSubmit={onSubmit}>
        <h1>Contact Us</h1>
        <div className="input-group">
          {FIELD_ROWS[0].map((field) => (
            <FormInput
              key={field.name}
              input={field}
              handleChange={handleChange}
              classNameLabel={" "}
            />
          ))}
        </div>
        <div className="input-group">
          {FIELD_ROWS[1].map((field) => (
            <FormInput
              key={field.name}
              input={field}
              handleChange={handleChange}
              classNameLabel={" "}
            />
          ))}
        </div>
        <label htmlFor="contact-message" className="message-label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Type your message here..."
          required
          onChange={handleChange}
        ></textarea>
        {submitError && <p className="error">{submitError}</p>}
        <div className="button-container">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
