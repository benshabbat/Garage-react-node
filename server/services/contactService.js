import Contact from "../models/Contact.js";
import { templatePhone } from "../utils/templates.js";

const createContact = async (req) => {
    const newContact = new Contact(req.body);
    const {phone} = req.body;
    const newPhone = templatePhone(phone);
    try {
      const savedContact = await newContact.save(
        {
          ...req.body,
          phone: newPhone,
        }
      );
      return savedContact;
    } catch (error) {
      throw Error(error);
    }
  };

  const getContacts = async () => {
    try {
      const contacts = await Contact.find();
      return contacts;
    } catch (error) {
      throw Error(error);
    }
  };

  const deleteContact = async (req) => {
    try {
      await Contact.findByIdAndDelete(req.params.id);
      return "The Message has been removed";
    } catch (error) {
      throw Error(error);
    }
  };

  const contactService = {
    createContact,
    getContacts,
    deleteContact
   
  };
  
  export default contactService;
  