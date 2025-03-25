const PHONE_REGEX = /^(?:[0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{3}-[0-9]{7}|[0-9]{10})$/;

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