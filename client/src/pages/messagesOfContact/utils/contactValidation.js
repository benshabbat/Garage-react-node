/**
 * Contact filter function for search
 * @param {Object} item - Contact object
 * @param {string} value - Search value
 * @returns {boolean} - True if matches
 */
export const contactFilterFn = (item, value) =>
  [
    item.firstName,
    item.lastName,
    item.email,
    item.phone,
    item.message,
  ].some((field) => field?.toLowerCase().includes(value.toLowerCase()));
