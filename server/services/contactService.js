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

const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const deleteContact = async (req) => {
  await Contact.findByIdAndDelete(req.params.id);
  return "The Message has been removed";
};

const contactService = {
  createContact,
  getContacts,
  deleteContact,
};

export default contactService;
