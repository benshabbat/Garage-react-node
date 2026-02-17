import "../../components/table/table.css";
import { useState, useEffect, useCallback } from "react";
import { MsgOfContactContext } from "./MsgOfContactContext";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesContact } from "../../features/admin/adminSlice";
import { deleteContact } from "../../utils";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";

export default function MsgOfContactProvider({ children }) {
  const { messagesContact } = useSelector((state) => state.admin);
  
  // Use generic filtering hook
  const contactFilterFn = useCallback((item, value) =>
    [
      item.firstName,
      item.lastName,
      item.email,
      item.phone,
      item.message,
    ].some((field) => field?.toLowerCase().includes(value.toLowerCase())),
    []
  );
  
  const { displayData: displayContacts, handleSearch } = 
    useFilteredData(messagesContact, contactFilterFn);
  
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
