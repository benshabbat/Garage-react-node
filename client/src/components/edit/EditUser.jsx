import { useState, useEffect } from "react";
import { Form, OpenModel } from "../index";
import { updateUser } from "../../Utils";
const EditUser = ({ handelClick, isOpen, user }) => {
  const [formData, setFormData] = useState(user);
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateUser(user?._id, formData);
    handelClick();
  };

  return (
    <OpenModel
      comp={
        <Form
          setData={setFormData}
          title="Edit User"
          sec_title="enter your name & password"
          inputs={[
            { name: "username", value: formData?.username },
            {
              name: "email",
              type: "email",
              value: formData?.email,
            },
            {
              name: "phone",
              value: formData?.phone,
            },
            {
              name: "password",
              type: "password",
              min: 8,
              value: formData?.password,
            },
          ]}
          handelClick={handelClick}
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpen}
    />
  );
};

export default EditUser;
