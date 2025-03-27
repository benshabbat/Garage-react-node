import validUserIsExist from "./validUserIsExist.js";
import validPhone from "./validPhone.js";
import validCar from "./validCar.js";
import validEmail from "./validEmail.js";
import validPass from "./validPass.js";

//TODO: Add more validation if existing(email, phone, username, etc)

// Constants for input validation messages and patterns
const INPUT_TYPES = {
  email: {
    title: "regex@gmail.com",
    errorMessage: "Your Email is wrong",
  },
  password: {
    title:
      "Must contain at least one number, uppercase and lowercase letter, and at least 8 characters",
    errorMessage: "Your password is wrong",
  },
  phone: {
    title: "Number of phone must 050-1234567",
    errorMessage: "Your phone number is wrong",
  },
  numberPlate: {
    title: "Number of car must 00-000-00 OR 000-00-000",
    errorMessage: "Your Car number is wrong",
  },
};
const inputType = (input) => {
  return (
    INPUT_TYPES[input.name] || {
      title: input.title,
      errorMessage: input.errorMessage,
    }
  );
};

const valid = (data, type) => {
  switch (type) {
    case "email":
      return validEmail(data);
    case "password":
      return validPass(data);
    case "phone":
      return validPhone(data);
    case "numberPlate":
      return validCar(data);
    default:
      return false;
  }
};

export {
  valid,
  validCar,
  validPhone,
  validPass,
  validEmail,
  inputType,
};
