import { useEffect, useCallback } from "react";
import { useAdminStore } from "../../../stores/adminStore";
import useFilteredData from "../../../hooks/useFilteredData";
import { contactFilterFn } from "../utils/contactValidation";
import { handleContactAction as handleContactActionUtil } from "../utils/contactHandlerUtils";
import { exportToCsv } from "../../../utils/exportCsv";

export function useMsgOfContactTable() {
  const messagesContact = useAdminStore((s) => s.messagesContact);
  const storeGetMessagesContact = useAdminStore((s) => s.getMessagesContact);

  const memoizedContactFilterFn = useCallback(contactFilterFn, []);
  const { displayData: displayContacts, handleSearch } = useFilteredData(
    messagesContact,
    memoizedContactFilterFn
  );

  useEffect(() => {
    storeGetMessagesContact();
  }, [storeGetMessagesContact]);

  const handleContact = async (e) => {
    await handleContactActionUtil(e);
    storeGetMessagesContact();
  };

  const handleExport = () => {
    const rows = displayContacts?.map((c) => ({
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
      phone: c.phone,
      message: c.message,
    }));
    exportToCsv(rows, "contacts");
  };

  return { displayContacts, handleSearch, handleContact, handleExport };
}
