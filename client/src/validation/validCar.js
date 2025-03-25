const CAR_REGEX = new RegExp(
  [
    "^[0-9]{3}-[0-9]{2}-[0-9]{3}$", // Format: XXX-XX-XXX
    "^[0-9]{2}-[0-9]{3}-[0-9]{2}$", // Format: XX-XXX-XX
    "^[0-9]{7,8}$",                 // Format: 7 or 8 digits
  ].join("|")
);

/**
 * Validates a car number based on specific formats:
 * - Format 1: XXX-XX-XXX
 * - Format 2: XX-XXX-XX
 * - Format 3: 7 or 8 digits without dashes
 * @param {string} data - The car number to validate.
 * @returns {boolean} - True if the car number is valid, false otherwise.
 */
const validCar = (data) => {
  if (!data || typeof data !== "string") return false;
  return CAR_REGEX.test(data);
};

export default validCar;