import "../../components/table/table.css";
import { useEffect, useCallback } from "react";
import { MsgOfContactContext } from "./MsgOfContactContext";
import { useAdminStore } from "../../stores/adminStore";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
import { contactFilterFn } from "./utils/contactValidation";
import { handleContactAction as handleContactActionUtil } from "./utils/contactHandlerUtils";

export default function MsgOfContactProvider({ children }) {
  const messagesContact = useAdminStore((s) => s.messagesContact);
  const storeGetMessagesContact = useAdminStore((s) => s.getMessagesContact);

  const memoizedContactFilterFn = useCallback(contactFilterFn, []);
  const { displayData: displayContacts, handleSearch } =
    useFilteredData(messagesContact, memoizedContactFilterFn);

  useEffect(() => {
    storeGetMessagesContact();
  }, [storeGetMessagesContact]);

  const handleContact = async (e) => {
    await handleContactActionUtil(e);
    storeGetMessagesContact();
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
