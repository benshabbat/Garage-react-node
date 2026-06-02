import "../../components/table/table.css";
import { MessagesContext } from "./MessagesContext";
import { useState, useEffect, useCallback } from "react";
import { useUserStore } from "../../stores/userStore";
import { useAdminStore } from "../../stores/adminStore";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
import { messageFilterFn } from "./utils/messageValidation";
import { handleMessageAction as handleMessageActionUtil } from "./utils/messageHandlerUtils";
import { useMessageModals } from "./hooks/useMessageModals";
import { useMessageHandlers } from "./hooks/useMessageHandlers";

export default function MessagesProvider({ children }) {
  const messages = useUserStore((s) => s.messages);
  const user = useUserStore((s) => s.user);
  const getMessagesByIdUser = useUserStore((s) => s.getMessagesByIdUser);
  const users = useAdminStore((s) => s.users);
  const getUsers = useAdminStore((s) => s.getUsers);

  const [selectedMsg, setSelectedMsg] = useState(null);

  // Modals management
  const modals = useMessageModals();
  
  // Filtering and search
  const memoizedMessageFilterFn = useCallback(messageFilterFn, []);
  const { displayData: displayMessages, handleSearch } = 
    useFilteredData(messages, memoizedMessageFilterFn);
  
  // Message handlers
  const messageHandlers = useMessageHandlers(selectedMsg, user, users, modals);

  useEffect(() => {
    if (user) getMessagesByIdUser(user?._id);
    if (user?.isAdmin) getUsers();
  }, [user, modals.createMsg.isOpen, modals.deleteMsg.isOpen, getMessagesByIdUser, getUsers]);

  const handleMsgAction = (e) => {
    handleMessageActionUtil(e, messages, setSelectedMsg, modals);
  };

  const value = {
    useCreateMsg: messageHandlers.useCreateMsg,
    handleMsgAction,
    selectedMsg,
    user,
    users,
    displayMessages,
    useDeleteMsg: messageHandlers.useDeleteMsg,
    handleSearch,
    modals,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}

MessagesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
