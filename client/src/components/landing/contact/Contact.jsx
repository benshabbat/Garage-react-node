import "./contact.css";
import { useState } from "react";
import { Form } from "../../index";
import { createContact } from "../../../utils";
//TODO: CONTACT US ON VALIDATE PHONE,EMAIL 
//TODO: SERVER:MODEL,ROUTES,SERVICES,CONTROLLERS
const Contact = () => {
  const [formData, setFormData] = useState({
    from: "",
    title: "",
    description: "",
  });

  const onSubmit = async(e) => {
    e.preventDefault();
    await createContact(formData);
  };
  
  return (
    <div id="contact">
      <Form
        isFocus={false}
        setData={setFormData}
        title="Contact Us"
        inputs={[
          { name: "name", type: "text" },
          { name: "email", type: "email" },
          { name: "phone", type: "tel" },
          { name: "message", type: "text" },
        ]}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Contact;
