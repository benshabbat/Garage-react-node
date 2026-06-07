import { makeRegexValidator } from "./validationUtils";

const CAR_REGEX = new RegExp(
  [
    "^[0-9]{3}-[0-9]{2}-[0-9]{3}$", // Format: XXX-XX-XXX
    "^[0-9]{2}-[0-9]{3}-[0-9]{2}$", // Format: XX-XXX-XX
    "^[0-9]{7,8}$", // Format: 7 or 8 digits
  ].join("|")
);

const validCar = makeRegexValidator(CAR_REGEX);

export default validCar;
