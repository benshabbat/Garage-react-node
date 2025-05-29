import "../../components/table/table.css";
import { useState, useEffect } from "react";
import { MsgOfContactContext } from "./MsgOfContactContext";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesContact } from "../../features/admin/adminSlice";
import { deleteContact } from "../../utils";

export default function MsgOfContactProvider({ children }) {
  const [filterContacts, setFilterContacts] = useState();
  const { messagesContact } = useSelector((state) => state.admin);
  const displayContacts = filterContacts || messagesContact;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessagesContact());
  }, [dispatch]);
  const handleContact = async (e) => {
    e.preventDefault();

    const { value, name } = e.target;
    if (name === "deleteContact") 
      await deleteContact(value);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setFilterContacts(
      messagesContact?.filter((item) =>
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
    messagesContact,
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
