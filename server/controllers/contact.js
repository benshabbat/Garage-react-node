import contactService from "../services/contactService.js";
import { createHandler } from "../utils/controllerFactory.js";

// Create contact handler
export const createContact = createHandler(contactService.createContact, 201);

// Get all contacts handler
export const getContacts = createHandler(contactService.getContacts, 200);

// Delete contact handler with custom message
export const deleteContact = createHandler(
  contactService.deleteContact,
  200,
  "The Message has been removed"
);