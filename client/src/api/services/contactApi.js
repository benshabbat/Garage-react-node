import { createCrudOperations, getAll } from "../crudOperations.js";
import { API_URL_CONTACTS } from "../apiEndpoints.js";

const contactOps = createCrudOperations(API_URL_CONTACTS);

/**
 * Contact API operations
 */
export const contactApi = {
  // Get all contacts
  getAll: contactOps.getAll,
  
  // Get contact by ID
  getById: contactOps.getById,
  
  // Create new contact
  create: contactOps.create,
  
  // Delete contact
  delete: contactOps.delete,
  
  // Get messages from contact form (alias)
  getMessages: async () => {
    const data = await getAll(API_URL_CONTACTS);
    return data || [];
  },
};

// Legacy exports for backwards compatibility
export const getContacts = contactApi.getAll;
export const createContact = contactApi.create;
export const deleteContact = contactApi.delete;
export const getMessagesContact = contactApi.getMessages;