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

  const [filteredMessages, setFilteredMessages] = useState();

  const [handleCreateMessage, isOpenCreateMessage] = useOpenModal();

  const displayMessages = filteredMessages || messages;
  const dispatch = useDispatch();


  useEffect(() => {
    if (user?.isAdmin) dispatch(getUsers());
    if (user) dispatch(getMessagesByIdUser(user?._id));
  }, [user, isOpenCreateMessage, dispatch]);

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
  };

  //need to make pop up yes no for delete
  const handleDelete = async (messageId) => {
    await deleteMessage(messageId);
  };

  const value = {
    onSubmit,
    setFormData,
    user,
    users,
    displayMessages,
    handleDelete,
    handleSearch,
    modals: {
      createMsg: { isOpen: isOpenCreateMessage, handle: handleCreateMessage },
    },
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}
