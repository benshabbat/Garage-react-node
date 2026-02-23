/**
 * Car filter function for search
 * @param {Object} item - Car object
 * @param {string} value - Search value
 * @returns {boolean} - True if matches
 */
export const carFilterFn = (item, value) =>
  item.numberPlate.includes(value) ||
  item.km.toString().includes(value) ||
  item.brand.includes(value);

/**
 * Service filter function for search
 * @param {Object} service - Service object
 * @param {string} value - Search value
 * @returns {boolean} - True if matches
 */
export const serviceFilterFn = (service, value) =>
  service?.title.includes(value) ||
  service?.description.includes(value) ||
  service?.price.toString().includes(value) ||
  service?.paid.toString().includes(value) ||
  service?.status.includes(value);
