import { useState } from "react";
import { validPhone, validPass, validEmail } from "../../validation/valid";
import { createUser } from "../../utils";
// export const useOnSubmitRegister = async ( formData, handelClick) => {
//   const isValidUserRegister = useIsValidRegister;
//   if (isValidUserRegister) {
//     await createUser(formData);
//     handelClick();
//   }
// };

// const useIsValidRegister = (users, formData) => {
//   const isValidUser = useIsValidUserName(users, formData);
//   return (
//     validPhone(formData?.phone) &&
//     !isValidUser &&
//     validPass(formData?.password) &&
//     validEmail(formData?.email)
//   );
// };

// export const useIsValidUserName = (users, formData) => {
//     const [isValidUser, setIsValidUser] = useState(false);

//       setIsValidUser(
//         users.map((user) => user.username).includes(formData?.username)
//       );

//       const res=  (
//         validPhone(formData?.phone) &&
//         !isValidUser &&
//         validPass(formData?.password) &&
//         validEmail(formData?.email)
//       )
//       return {isValidUser,res};
// };

export const isValidUserName = (formData,isValidUser) => {
    return (
      validPhone(formData?.phone) &&
      !isValidUser &&
      validPass(formData?.password) &&
      validEmail(formData?.email)
    );
  };


