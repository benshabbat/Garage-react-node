import { useState } from "react";
import { Form, OpenModel } from "../index";
import { updateUser } from "../../utils";
import { validPhone, validPass } from "../../validation/valid";
import { useUsersContext } from "../../pages/users/UsersContext";

//todo:try move logic to context
const EditUser = ({ handelClick, isOpen }) => {
  const { selectedUser } = useUsersContext();
  const [formData, setFormData] = useState(selectedUser);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validPhone(formData?.phone) && validPass(formData?.password)) {
      await updateUser(selectedUser?._id, formData);
      handelClick();
    }
  };

  return (
    <OpenModel
      comp={
        <Form
          setData={setFormData}
          title="Edit User"
          sec_title="enter your name & password"
          inputs={[
            {
              name: "username",
              value: formData?.username,
            },
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
