import "../../components/table/table.css";
import { MessagesContext } from "./MessagesConetxt";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByIdUser } from "../../features/user/userSlice";
import { getUsers } from "../../features/admin/adminSlice";
import useOpenModal from "../../hooks/useOpenModal";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
import { messageFilterFn, usersToOptions } from "./utils/messageValidation";
import { useMessageForm } from "./hooks/useMessageForm";
import { useMessageActions } from "./hooks/useMessageActions";
//TODO:handle message for requests
export default function MessagesProvider({ children }) {
  const { messages, user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.admin);

  const [selectedMsg, setSelectedMsg] = useState(null);

  // Modals
  const [handleDeleteMessage, isOpenModalDeleteMessage] = useOpenModal();
  const [handleCreateMessage, isOpenCreateMessage] = useOpenModal();
  
  // Filtering and search
  const memoizedMessageFilterFn = useCallback(messageFilterFn, []);
  const { displayData: displayMessages, handleSearch } = 
    useFilteredData(messages, memoizedMessageFilterFn);
  
  // Message actions
  const messageActions = useMessageActions(selectedMsg, user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(getMessagesByIdUser(user?._id));
    if (user?.isAdmin) dispatch(getUsers());
  }, [user, isOpenCreateMessage, isOpenModalDeleteMessage, dispatch]);
  const handleMsgAction = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const message = messages.find((message) => message._id === value);
    setSelectedMsg(message);

    switch (name) {
      case "createMessage":
        handleCreateMessage();
        break;
      case "deleteMessage":
        handleDeleteMessage();
        break;
    }
  };
  
  // Hook for creating message
  const useCreateMsg = () => {
    const options = user?.isAdmin ? usersToOptions(users) : undefined;
    const messageForm = useMessageForm(user);
    
    const onSubmit = (e) => {
      messageActions.onSubmitCreateMessage(e, messageForm.formData, handleCreateMessage);
    };
    
    return {
      onSubmit,
      setFormData: messageForm.setFormData,
      formData: messageForm.formData,
      options
    };
  };
    
  // Delete message handler
  const useDeleteMsg = (e) => {
    messageActions.onSubmitDeleteMessage(e, handleDeleteMessage);
  };

  const value = {
    useCreateMsg,
    handleMsgAction,
    selectedMsg,
    user,
    users,
    displayMessages,
    useDeleteMsg,
    handleSearch,
    modals: {
      deleteMsg: { isOpen: isOpenModalDeleteMessage, handle: handleDeleteMessage },
      createMsg: { isOpen: isOpenCreateMessage, handle: handleCreateMessage },
    },
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
