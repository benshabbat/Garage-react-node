import "./contact.css";
import { useState } from "react";
import { Form } from "../../index";
import { createContact } from "../../../utils";


//TODO:MAYBE TO ADD PHONE
const Contact = () => {
  const [formData, setFormData] = useState({
    from: "",
    title: "",
    description: "",
  });

  const onSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    await createContact(formData);
  };
  
  return (
    <div id="contact">
      <Form
        isFocus={false}
        setData={setFormData}
        title="Contact"
        sec_title="Send for contact with admin"
        inputs={[
          { name: "from", type: "text" },
          { name: "subject", type: "text" },
          { name: "message", type: "text" },
        ]}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Contact;
