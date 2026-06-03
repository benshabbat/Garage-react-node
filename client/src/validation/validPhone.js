import { makeRegexValidator } from "./validationUtils";

const PHONE_REGEX = new RegExp(
  [
    "^[0-9]{3}-[0-9]{3}-[0-9]{4}$", //  Format 1: XXX-XXX-XXXX
    "^[0-9]{3}-[0-9]{7}$",          //  Format 2: XXX-XXXXXXX
    "^[0-9]{10}$",                  //  Format 3: XXXXXXXXXX (10 digits without dashes)
  ].join("|")
);

const validPhone = makeRegexValidator(PHONE_REGEX);

export default validPhone;
