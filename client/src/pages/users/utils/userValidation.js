import {
  validCar,
  validPhone,
  validPass,
  validEmail,
} from "../../../validation/valid";
import { templatePhone } from "../../../../../server/utils/templates";

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
 * Check for duplicate email in users list
 * @param {Array} users - List of users
 * @param {string} email - Email to check
 * @param {string} excludeUserId - User ID to exclude from check (for edit)
 * @returns {boolean} - True if email exists
 */
export const checkDuplicateEmail = (users, email, excludeUserId = null) => {
  if (!email) return false;
  
  return users?.some(
    (user) => user.email === email && user._id !== excludeUserId
  ) || false;
};

/**
 * Check for duplicate phone in users list
 * @param {Array} users - List of users
 * @param {string} phone - Phone to check
 * @param {string} excludeUserId - User ID to exclude from check (for edit)
 * @returns {boolean} - True if phone exists
 */
export const checkDuplicatePhone = (users, phone, excludeUserId = null) => {
  if (!phone) return false;
  
  const formattedPhone = templatePhone(phone);
  return users?.some(
    (user) => user.phone === formattedPhone && user._id !== excludeUserId
  ) || false;
};

/**
 * Check for duplicate username in users list
 * @param {Array} users - List of users
 * @param {string} username - Username to check
 * @param {string} excludeUserId - User ID to exclude from check (for edit)
 * @returns {boolean} - True if username exists
 */
export const checkDuplicateUsername = (users, username, excludeUserId = null) => {
  if (!username) return false;
  
  return users?.some(
    (user) => user.username === username && user._id !== excludeUserId
  ) || false;
};

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
