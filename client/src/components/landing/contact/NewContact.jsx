import { useState } from "react";
import { createContact } from "../../../utils";
import FormInput from "../../form/FormInput";
import "./newContact.css"; // Make sure to import the CSS file
import CheckCircle from "../../../icons/CheckCircle";

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
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container-contact">
        <div className="success-message">
          <CheckCircle className="success-icon" />
          <h2 className="success-title">Thank You!</h2>
          <p>Your message has been sent successfully. We'll contact you soon.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="new-message-button"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="contact" className="container-contact">
      <form onSubmit={onSubmit}>
        <h1>Contact Us</h1>
        <div className="input-group">
          <FormInput
            input={{
              name: "firstName",
              type: "text",
              placeholder: "First Name",
            }}
            handleChange={handleChange}
            classNameLabel={" "}
          />
          <FormInput
            input={{
              name: "lastName",
              type: "text",
              placeholder: "Last Name",
            }}
            handleChange={handleChange}
            classNameLabel={" "}
          />
        </div>
        <div className="input-group">
          <FormInput
            input={{
              name: "email",
              type: "email",
              placeholder: "Email",
            }}
            handleChange={handleChange}
            classNameLabel={" "}
          />
          <FormInput
            input={{
              name: "phone",
              type: "tel",
              placeholder: "Phone",
            }}
            handleChange={handleChange}
            classNameLabel={" "}
          />
        </div>
        <h4>Type your message here...</h4>
        <textarea 
          name="message" 
          required 
          onChange={handleChange}
        ></textarea>
        <div className="button-container">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}