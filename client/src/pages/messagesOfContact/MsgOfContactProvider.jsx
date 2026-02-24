import "../../components/table/table.css";
import { useEffect, useCallback } from "react";
import { MsgOfContactContext } from "./MsgOfContactContext";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesContact } from "../../features/admin/adminSlice";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
import { contactFilterFn } from "./utils/contactValidation";
import { handleContactAction as handleContactActionUtil } from "./utils/contactHandlerUtils";

export default function MsgOfContactProvider({ children }) {
  const { messagesContact } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  
  // Filtering and search
  const memoizedContactFilterFn = useCallback(contactFilterFn, []);
  const { displayData: displayContacts, handleSearch } = 
    useFilteredData(messagesContact, memoizedContactFilterFn);
  
  useEffect(() => {
    dispatch(getMessagesContact());
  }, [dispatch]);

  const handleContact = (e) => {
    handleContactActionUtil(e);
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
