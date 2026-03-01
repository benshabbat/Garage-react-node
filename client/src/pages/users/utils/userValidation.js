import {
  validCar,
  validPhone,
  validPass,
  validEmail,
} from "../../../validation/valid";
import { formatPhone } from "../../../utils/formatters";

/**
 * Check if user has valid username (email, phone, password)
 * @param {Object} formData - User form data
 * @returns {boolean} - True if valid
 */
export const isValidUserName = (formData) => {
  return (
    validPhone(formData?.phone) &&
    validPass(formData?.password) &&
    validEmail(formData?.email)
  );
};

/**
 * Check if car number plate is valid
 * @param {string} numberPlate - Car number plate
 * @returns {boolean} - True if valid
 */
export const isValidCar = (numberPlate) => {
  return validCar(numberPlate);
};

/**
 * Base duplicate checker across a users list.
 * @param {Array} users
 * @param {string} field - Field name to compare
 * @param {string} value - Value to search for
 * @param {string|null} excludeUserId - Skip this user (edit mode)
 * @param {Function} [transform] - Optional transform applied to value before comparing
 * @returns {boolean}
 */
const checkDuplicate = (users, field, value, excludeUserId = null, transform = (v) => v) => {
  if (!value) return false;
  const normalized = transform(value);
  return users?.some((user) => user[field] === normalized && user._id !== excludeUserId) || false;
};

/**
 * Check for duplicate email in users list
 */
export const checkDuplicateEmail = (users, email, excludeUserId = null) =>
  checkDuplicate(users, "email", email, excludeUserId);

/**
 * Check for duplicate phone in users list
 */
export const checkDuplicatePhone = (users, phone, excludeUserId = null) =>
  checkDuplicate(users, "phone", phone, excludeUserId, formatPhone);

/**
 * Check for duplicate username in users list
 */
export const checkDuplicateUsername = (users, username, excludeUserId = null) =>
  checkDuplicate(users, "username", username, excludeUserId);

/**
 * User filter function for search
 * @param {Object} item - User object
 * @param {string} value - Search value
 * @returns {boolean} - True if matches
 */
export const userFilterFn = (item, value) => 
  item.username?.includes(value) ||
  item.email?.includes(value) ||
  item.phone?.includes(value);
