import "../../components/table/table.css";
import { MessagesContext } from "./MessagesConetxt";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByIdUser } from "../../features/user/userSlice";
import { getUsers } from "../../features/admin/adminSlice";
import { deleteMessage } from "../../utils";
import useOpenModel from "../../hooks/useOpenModel";

export default function MessagesProvider({ children }) {
  const { messages, user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.admin);

  const [filteredMessages, setFilteredMessages] = useState();
  const [isDeleted, setIsDeleted] = useState(false);

  const [handleCreateMessage, isOpenCreateMessage] = useOpenModel();

  const displayMessages = filteredMessages || messages;
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.isAdmin) dispatch(getUsers());
    if (user) dispatch(getMessagesByIdUser(user?._id));
  }, [user, isOpenCreateMessage, isDeleted, dispatch]);

  //   const filterSearch = (e) => {
  //     setFilterMessages(
  //       messages?.filter((item) =>
  //         Object.values({
  //           username: item?.from?.username,
  //           toUsername: item?.to?.username,
  //           title: item?.title,
  //           description: item?.description,
  //           date: item?.updatedAt,
  //         }).some((value) =>
  //           value?.toLowerCase().includes(e.target.value.toLowerCase())
  //         )
  //       )
  //     );
  //   };
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

  const handleDelete = async (messageId) => {
    await deleteMessage(messageId);
    setIsDeleted((prev) => !prev);
  };

  const value = {
      users,
    displayMessages,
    handleDelete,
    handleSearch,
    modlas: {
      createMsg: { isOpen: isOpenCreateMessage, onClose: handleCreateMessage },
    },
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}
