import { useState } from "react";
// import { createReqService } from "../../../features/user/userSlice";
// import { useDispatch } from "react-redux";
import "./contact.css";
import { Form } from "../../index";
import { createContact } from "../../../utils";
const Contact = () => {
  const [formData, setFormData] = useState({
    from: "",
    title: "",
    description: "",
  });
  // const dispatch = useDispatch();
  const onSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    await createContact(formData);
    //TODO: create req service from contact to another page and to add check box if the req checked
    // dispatch(createReqService(formData));
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
