const PHONE_REGEX = new RegExp(
  [
    "^[0-9]{3}-[0-9]{3}-[0-9]{4}$", //  Format 1: XXX-XXX-XXXX
    "^[0-9]{3}-[0-9]{7}$",          //  Format 2: XXX-XXXXXXX
    "^[0-9]{10}$",                  //  Format 3: XXXXXXXXXX (10 digits without dashes)
  ].join("|")
);

/**
 * Validates a phone number based on specific formats:
 * - Format 1: XXX-XXX-XXXX
 * - Format 2: XXX-XXXXXXX
 * - Format 3: XXXXXXXXXX (10 digits without dashes)
 * @param {string} data - The phone number to validate.
 * @returns {boolean} - True if the phone number is valid, false otherwise.
 */
const validPhone = (data) => {
  if (!data || typeof data !== "string") return false;
  return PHONE_REGEX.test(data);
};

export default validPhone;
