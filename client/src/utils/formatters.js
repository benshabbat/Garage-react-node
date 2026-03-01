/**
 * Format phone number to XXX-XXX-XXXX pattern
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export function formatPhone(phone) {
  if (!phone || typeof phone !== "string") return phone;
  
  // Remove any existing dashes
  const cleaned = phone.replace(/-/g, '');
  
  // Format 10 digit phone: XXX-XXX-XXXX
  if (cleaned.length === 10) {
    return cleaned.slice(0, 3) + "-" + cleaned.slice(3, 6) + "-" + cleaned.slice(6);
  }
  
  // Already has one dash at position 3, reformat
  if (phone.length === 11 && phone.charAt(3) === "-") {
    return phone.slice(0, 3) + "-" + phone.slice(4, 7) + "-" + phone.slice(7);
  }
  
  return phone;
}

/**
 * Truncate a string to a maximum length, appending "..."
 * @param {string} text
 * @param {number} max
 * @returns {string}
 */
export function truncate(text, max) {
  if (!text) return "";
  return text.length > max ? text.substring(0, max) + "..." : text;
}

/**
 * Format car license plate number
 * @param {string} car - Car license plate number
 * @returns {string} Formatted license plate
 */
export function formatCarPlate(car) {
  if (!car || typeof car !== "string") return car;
  
  // Format 8 digit plate: XXX-XX-XXX
  if (car.length === 8) {
    return car.slice(0, 3) + "-" + car.slice(3, 5) + "-" + car.slice(5);
  } 
  // Format 7 digit plate: XX-XXX-XX
  else if (car.length === 7) {
    return car.slice(0, 2) + "-" + car.slice(2, 5) + "-" + car.slice(5);
  }
  
  return car;
}
