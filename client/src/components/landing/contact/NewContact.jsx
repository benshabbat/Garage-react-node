import "./newContact.css";
import { useState } from "react";
import { createContact } from "../../../utils";
import FormInput from "../../form/FormInput";
export default function NewContact() {
  const [formData, setFormData] = useState();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await createContact(formData);
  };
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
        <textarea name="message" required onChange={handleChange}></textarea>
        <div className="button-container">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
