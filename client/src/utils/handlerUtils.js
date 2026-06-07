/**
 * Shared prefix for every table action handler:
 * prevents default, reads the button's name + value,
 * finds the matching item, and sets it as selected.
 * Returns the button name so the caller can switch on it.
 *
 * @param {Event}    e          - Click event
 * @param {Array}    items      - Full list of entities
 * @param {Function} setSelected - State setter for the selected entity
 * @returns {string} The button's name attribute
 */
export const extractErrorMessage = (err) =>
  err?.response?.data?.message ?? err?.message ?? String(err);

export const resolveActionTarget = (e, items, setSelected) => {
  e.preventDefault();
  const { name, value } = e.target;
  setSelected(items.find((item) => item._id === value));
  return name;
};
