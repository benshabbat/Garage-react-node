import "./newContact.css";
import { useState } from "react";
import { createContact } from "../../../utils";
//TODO:Logic
//TODO:add validate
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
    <div className="container-contact">
      <form onSubmit={onSubmit}>
        <h1>Contact Us</h1>
        <div className="input-group">
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone"
            required
            onChange={handleChange}
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
