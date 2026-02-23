/**
 * Car filter function for search
 * @param {Object} item - Car object
 * @param {string} value - Search value
 * @returns {boolean} - True if matches
 */
export const carFilterFn = (item, value) =>
  item.owner?.username.includes(value) ||
  item.numberPlate.includes(value) ||
  item.km.toString().includes(value) ||
  item.brand.includes(value);

/**
 * Service status options
 */
export const serviceStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "done", label: "Done" },
  { value: "on-work", label: "On work" },
];
