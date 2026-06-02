import Contact from "../models/Contact.js";
import { templatePhone } from "../utils/templates.js";

const createContact = async (req) => {
  const { phone } = req.body;
  const newPhone = templatePhone(phone);
  const newContact = new Contact({
    ...req.body,
    phone: newPhone,
  });
  const savedContact = await newContact.save();
  return savedContact;
};

const getContacts = async (req) => {
  const limit = Math.min(parseInt(req.query.limit) || 500, 500);
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const contacts = await Contact.find().skip((page - 1) * limit).limit(limit);
  return contacts;
};

const deleteContact = async (req) => {
  await Contact.findByIdAndDelete(req.params.id);
  return "The Contact has been removed";
};

const contactService = {
  createContact,
  getContacts,
  deleteContact,
};

export default contactService;
