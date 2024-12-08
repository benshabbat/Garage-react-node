import { useState } from "react";
import { createUser } from "../../utils";
import { validPhone, validPass, validEmail } from "../../validation/valid";


export function useRegister(users,handleClick){
  const [formData, setFormData] = useState();
  const [isValidUser, setIsValidUser] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsValidUser(
      users.map((user) => user.username).includes(formData?.username)
    );
    if (isValidUserName(formData,isValidUser)) {
      await createUser(formData);
      handleClick();
    }
  };
  return {setFormData,onSubmit,isValidUser}
}

export const isValidUserName = (formData, isValidUser) => {
  return (
    validPhone(formData?.phone) &&
    !isValidUser &&
    validPass(formData?.password) &&
    validEmail(formData?.email)
  );
};


