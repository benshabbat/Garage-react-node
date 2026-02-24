import { deleteContact } from "../../../utils";

/**
 * Handle contact actions based on button click
 * @param {Event} e - Event object
 * @returns {Promise<void>}
 */
export const handleContactAction = async (e) => {
  e.preventDefault();

  const { value, name } = e.target;
  if (name === "deleteContact") {
    await deleteContact(value);
  }
};
