import { validPhone, validPass, validEmail } from "../../validation/valid";


export const isValidUserName = (formData, isValidUser) => {
  return (
    validPhone(formData?.phone) &&
    !isValidUser &&
    validPass(formData?.password) &&
    validEmail(formData?.email)
  );
};

