import Contact from "../models/Contact.js";

const createContact = async (req) => {
    const newContact = new Contact(req.body);
    try {
      const savedContact = await newContact.save();
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


  const contactService = {
    createContact,
    getContacts,
   
  };
  
  export default contactService;
  