import "../../components/table/table.css";
import { useEffect, useCallback } from "react";
import { MsgOfContactContext } from "./MsgOfContactContext";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesContact } from "../../features/admin/adminSlice";
import { deleteContact } from "../../utils";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
import { contactFilterFn } from "./utils/contactValidation";

export default function MsgOfContactProvider({ children }) {
  const { messagesContact } = useSelector((state) => state.admin);
  
  // Filtering and search
  const memoizedContactFilterFn = useCallback(contactFilterFn, []);
  const { displayData: displayContacts, handleSearch } = 
    useFilteredData(messagesContact, memoizedContactFilterFn);
  
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
  const value = {
    messagesContact,
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

MsgOfContactProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
