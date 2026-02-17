import "../../components/table/table.css";
import { MessagesContext } from "./MessagesConetxt";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByIdUser } from "../../features/user/userSlice";
import { getUsers } from "../../features/admin/adminSlice";
import {
  deleteMessage,
  createMessage,
  createMessageToAdmin,
} from "../../utils";
import useOpenModal from "../../hooks/useOpenModal";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
//TODO:handle message for requests
export default function MessagesProvider({ children }) {
  const { messages, user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.admin);

  const [selectedMsg, setSelectedMsg] = useState(null);

  const [handleDeleteMessage, isOpenModalDeleteMessage] = useOpenModal();
  const [handleCreateMessage, isOpenCreateMessage] = useOpenModal();
  
  // Use generic filtering hook
  const messageFilterFn = useCallback((item, value) =>
    item?.from?.username.includes(value) ||
    item?.to?.username.includes(value) ||
    item?.title.includes(value) ||
    item?.description.includes(value) ||
    item?.updatedAt.includes(value),
    []
  );
  
  const { displayData: displayMessages, handleSearch } = 
    useFilteredData(messages, messageFilterFn);
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
  
  const useCreateMsg = ()=>{
    const options = user?.isAdmin && users?.length > 0
      ? users.map(u => ({ value: u._id, label: u.username }))
      : undefined;
    const [formData, setFormData] = useState({
      from: user?._id,
    });
    const onSubmit = async (e) => {
      e.preventDefault();
      if (user?.isAdmin) {
        await createMessage(formData, formData?.to);
      } else {
        await createMessageToAdmin(formData);
      }
      handleCreateMessage();
      
    }
    return{onSubmit,setFormData,formData,options}
  }
    
  const useDeleteMsg = async (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "deleteMessage") {
      await deleteMessage(selectedMsg?._id);
      handleDeleteMessage();
    }
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
