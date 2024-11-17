import contactService from "../services/contactService.js";
export const createContact = async (req, res, next) => {
  try {
    const savedContact = await contactService.createContact(req);
    res.status(200).json(savedContact);
  } catch (err) {
    next(err);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactService.getContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};