import "../../components/table/table.css";
import { MessagesContext } from "./MessagesConetxt";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByIdUser } from "../../features/user/userSlice";
import { getUsers } from "../../features/admin/adminSlice";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
import { messageFilterFn } from "./utils/messageValidation";
import { handleMessageAction as handleMessageActionUtil } from "./utils/messageHandlerUtils";
import { useMessageModals } from "./hooks/useMessageModals";
import { useMessageHandlers } from "./hooks/useMessageHandlers";

export default function MessagesProvider({ children }) {
  const { messages, user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

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
    if (user) dispatch(getMessagesByIdUser(user?._id));
    if (user?.isAdmin) dispatch(getUsers());
  }, [user, modals.createMsg.isOpen, modals.deleteMsg.isOpen, dispatch]);

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
