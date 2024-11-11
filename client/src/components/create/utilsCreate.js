import { useState } from "react";
import { createReqService,createUser } from "../../utils";
import { validPhone, validPass, validEmail } from "../../validation/valid";


export function useRegister(users,handelClick){
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



//dosent work
export function useReqService(handelClick, car, user) {
  const [formData, setFormData] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      title: car?.numberPlate.toString(),
      from: user?._id,
    }));
    console.log(formData?.title) 
    if (formData?.title) {
      console.log(formData) 
      await createReqService(formData);
      handelClick();
    }
  };
  return { setFormData,onSubmit};
}
