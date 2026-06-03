import "./contact.css";
import { Form } from "../../index";
import { useContactLegacyForm } from "./hooks/useContactLegacyForm";
//TODO: CONTACT US ON VALIDATE PHONE,EMAIL
//TODO: SERVER:MODEL,ROUTES,SERVICES,CONTROLLERS
const Contact = () => {
  const { setFormData, onSubmit } = useContactLegacyForm();
  
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
