import Contact from "../models/Contact.js";
import { templatePhone } from "../utils/templates.js";
import { getPaginationParams, pickAllowed } from "../utils/queryHelpers.js";
import { createError } from "../utils/error.js";

const ALLOWED_CONTACT_FIELDS = ["firstName", "lastName", "email", "phone", "message"];

const createContact = async (req) => {
  const safeBody = pickAllowed(req.body, ALLOWED_CONTACT_FIELDS);
  const newPhone = templatePhone(safeBody.phone);
  const newContact = new Contact({
    ...safeBody,
    phone: newPhone,
  });
  const savedContact = await newContact.save();
  return savedContact;
};

const getContacts = async (req) => {
  const { limit, page } = getPaginationParams(req);
  const contacts = await Contact.find()
    .skip((page - 1) * limit)
    .limit(limit);
  return contacts;
};

const deleteContact = async (req) => {
  const deleted = await Contact.findByIdAndDelete(req.params.id);
  if (!deleted) throw createError(404, "Contact not found");
  return "The Contact has been removed";
};

const contactService = {
  createContact,
  getContacts,
  deleteContact,
};

export default contactService;
