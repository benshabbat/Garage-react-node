import validUser from "./validUser.js";
import validPhone from "./validPhone.js";
import validCar from "./validCar.js";
import validEmail from "./validEmail.js";
import validPass from "./validPass.js";



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
export { valid, validCar, validPhone, validPass, validEmail,validUser };
