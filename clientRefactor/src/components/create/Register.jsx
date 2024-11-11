import { useState } from "react";
import { createUser } from "../../utils";
import { Form, OpenModel } from "..";
import { isValidUserName } from "./utilsCreate";

const Register = ({ handelClick, isOpen, users }) => {
  const [formData, setFormData] = useState();
  const [isValidUser, setIsValidUser] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsValidUser(
      users.map((user) => user.username).includes(formData?.username)
    );
    if (isValidUserName(formData,isValidUser)) {
      await createUser(formData);
      handelClick();
    }
  };
  return (
    <OpenModel
      comp={
        <Form
          setData={setFormData}
          title="Create User"
          sec_title=""
          inputs={[
            {
              name: "username",
              errorMessage: "Username is exist",
              isError: isValidUser,
            },
            {
              name: "email",
              type: "email",
            },
            {
              name: "phone",
            },
            {
              name: "password",
              type: "password",
              min: 8,
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

export default Register;
