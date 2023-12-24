const CAR_REGEX =
  /^[0-9]{3}[-][0-9]{2}[-][0-9]{3}|[0-9]{2}[-][0-9]{3}[-][0-9]{2}|[0-9]{7,8}$/;
const PHONE_REGEX = /^[0-9]{3}[-][0-9]{7}|[0-9]{10}$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const validCar = (data) => {
  if (
    ((data?.length === 8 || data?.length === 7) && +data) ||
    (data?.length === 10 && data.at(3) === "-" && data.at(6) === "-") ||
    (data?.length === 9 && data.at(2) === "-" && data.at(6) === "-")
  ) {
    return CAR_REGEX.test(data);
  } else return false;
};
const validPhone = (data) => {
  if (
    (data?.length === 10 && +data) ||
    (data?.length === 11 && data.at(3) === "-")
  ) {
    return PHONE_REGEX.test(data);
  } else return false;
};
const validPass = (data) => {
  return PASS_REGEX.test(data);
};
const validEmail = (data) => {
  return EMAIL_REGEX.test(data);
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
export { valid, validCar, validPhone, validPass, validEmail };
