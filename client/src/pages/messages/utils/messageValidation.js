/**
 * Message filter function for search
 * @param {Object} item - Message object
 * @param {string} value - Search value
 * @returns {boolean} - True if matches
 */
export const messageFilterFn = (item, value) =>
  item?.from?.username.includes(value) ||
  item?.to?.username.includes(value) ||
  item?.title.includes(value) ||
  item?.description.includes(value) ||
  item?.updatedAt.includes(value);

/**
 * Convert users array to options for select
 * @param {Array} users - List of users
 * @returns {Array} Options array for select
 */
export const usersToOptions = (users) => 
  users?.length > 0 
    ? users.map(u => ({ value: u._id, label: u.username }))
    : undefined;
