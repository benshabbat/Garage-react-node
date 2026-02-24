/**
 * Month names for date formatting
 */
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Time units in seconds
 */
const TIME_UNITS = {
  YEAR: 365 * 24 * 60 * 60,
  MONTH: 30 * 24 * 60 * 60,
  DAY: 24 * 60 * 60,
  HOUR: 60 * 60,
  MINUTE: 60,
};

/**
 * Calculate time difference and format date/time information
 * @param {string} updatedAt - ISO date string
 * @returns {Object} Formatted date, time, and time ago information
 */
export function getMomentFromUpdatedAt(updatedAt) {
  const date = new Date(updatedAt);
  const now = new Date();
  const diffSeconds = Math.floor((now - date) / 1000);

  // Calculate time units
  const units = {
    years: Math.floor(diffSeconds / TIME_UNITS.YEAR),
    months: Math.floor(diffSeconds / TIME_UNITS.MONTH),
    days: Math.floor(diffSeconds / TIME_UNITS.DAY),
    hours: Math.floor(diffSeconds / TIME_UNITS.HOUR),
    minutes: Math.floor(diffSeconds / TIME_UNITS.MINUTE),
    seconds: diffSeconds
  };

  // Determine time ago string
  let timeAgo;
  if (units.years > 0) timeAgo = `${units.years} years`;
  else if (units.months > 0) timeAgo = `${units.months} months`;
  else if (units.days > 0) timeAgo = `${units.days} days`;
  else if (units.hours > 0) timeAgo = `${units.hours} hours`;
  else if (units.minutes > 0) timeAgo = `${units.minutes} minutes`;
  else timeAgo = `${units.seconds} seconds`;

  // Format date components
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const monthName = MONTHS[date.getMonth()];
  
  // Format time components
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return {
    theDate: `${day}/${month}/${year}`,
    theTime: `${formattedHours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}${ampm}`,
    theTimeAgo: `${timeAgo} ago`,
    monthName
  };
}

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {string|Date} date - Date to compare
 * @returns {string} Relative time string
 */
export function getRelativeTime(date) {
  const { theTimeAgo } = getMomentFromUpdatedAt(date);
  return theTimeAgo;
}
