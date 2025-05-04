import "../../components/table/table.css";
import { MessagesContext } from "./MessagesConetxt";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByIdUser } from "../../features/user/userSlice";
import { getUsers } from "../../features/admin/adminSlice";
import {
  deleteMessage,
  createMessage,
  createMessageToAdmin,
} from "../../utils";
import useOpenModal from "../../hooks/useOpenModal";
//TODO:handle message for requests
export default function MessagesProvider({ children }) {
  const { messages, user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.admin);

  const [selectedMsg, setSelectedMsg] = useState(null);
  const [filteredMessages, setFilteredMessages] = useState();

  const [handleDeleteMessage, isOpenModalDeleteMessage] = useOpenModal();
  const [handleCreateMessage, isOpenCreateMessage] = useOpenModal();
  
  const displayMessages = filteredMessages || messages;
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(getMessagesByIdUser(user?._id));
    if (user?.isAdmin) dispatch(getUsers());
  }, [user, isOpenCreateMessage, isOpenModalDeleteMessage, dispatch]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setFilteredMessages(
      value
        ? messages.filter(
            (item) =>
              item?.from?.username.includes(value) ||
              item?.to?.username.includes(value) ||
              item?.title.includes(value) ||
              item?.description.includes(value) ||
              item?.updatedAt.includes(value)
          )
        : null
    );
  };
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
    const options=user?.isAdmin ? users : null
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
