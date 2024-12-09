import "../../components/table/table.css";
import { useState, useEffect } from "react";
import { MsgOfContactContext } from "./MsgOfContactContext";
import { getContacts, deleteContact } from "../../utils";
export default function MsgOfContactProvider({ children }) {
  
  const [contacts, setContacts] = useState();
  const [filterContacts, setFilterContacts] = useState();

  const displayContacts = filterContacts || contacts;

  useEffect(() => {
    const getData = async () => {
      const { data } = await getContacts();
      setContacts(data);
    };
    getData();
  }, []);
  const handleContact = async (e) => {
    e.preventDefault();

    const { value, name } = e.target;
    if (name === "deleteContact") await deleteContact(value);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setFilterContacts(
      contacts?.filter((item) =>
        [
          item.firstName,
          item.lastName,
          item.email,
          item.phone,
          item.message,
        ].some((field) => field?.toLowerCase().includes(value.toLowerCase()))
      )
    );
  };
  const value = {
    filterContacts,
    handleSearch,
    displayContacts,
    handleContact,
  };
  return (
    <MsgOfContactContext.Provider value={value}>
      {children}
    </MsgOfContactContext.Provider>
  );
}
