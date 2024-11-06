import { useState } from "react";
import { createReqService } from "../../../features/user/userSlice";
import { useDispatch } from "react-redux";
import "./contact.css";
import { Form } from "../../index";
const Contact = () => {
  const ADMIN = "63e14deca4340e45d23f20b2";
  const [formData, setFormData] = useState({
    from: "",
    to: ADMIN,
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(createReqService(formData));
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
          { name: "title", type: "text" },
          { name: "description", type: "text" },
        ]}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Contact;
