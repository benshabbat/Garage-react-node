/**
 * Validates if the given input is a valid email address.
 * @param {string} data - The input to validate.
 * @returns {boolean} True if the input is a valid email, false otherwise.
 */
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validEmail = (data) => {
  if (typeof data !== 'string') {
    return false;
  }
  return EMAIL_REGEX.test(data.trim());
};

export default validEmail;
