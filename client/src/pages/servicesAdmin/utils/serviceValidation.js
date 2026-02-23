/**
 * Service filter function for search
 * @param {Object} item - Service object
 * @param {string} value - Search value
 * @returns {boolean} - True if matches
 */
export const serviceFilterFn = (item, value) =>
  item.car?.numberPlate.includes(value) ||
  item.title.includes(value) ||
  item.description.includes(value) ||
  item.price.toString().includes(value) ||
  item.paid.toString().includes(value) ||
  item.status.includes(value);

/**
 * Service status options
 */
export const serviceStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "done", label: "Done" },
  { value: "on-work", label: "On work" },
];
