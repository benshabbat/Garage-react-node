import { useEffect, useCallback } from "react";
import { useUserStore } from "../../../stores/userStore";
import { useAdminStore } from "../../../stores/adminStore";
import { useMessagesUIStore } from "../../../stores/uiStores";
import useFilteredData from "../../../hooks/useFilteredData";
import { messageFilterFn } from "../utils/messageValidation";
import { handleMessageAction as handleMessageActionUtil } from "../utils/messageHandlerUtils";

export function useMessagesTable() {
  const messages = useUserStore((s) => s.messages);
  const user = useUserStore((s) => s.user);
  const getMessagesByIdUser = useUserStore((s) => s.getMessagesByIdUser);
  const getUsers = useAdminStore((s) => s.getUsers);
  const { createMsgOpen, deleteMsgOpen, toggleCreateMsg, setSelectedMsg, toggleDeleteMsg } =
    useMessagesUIStore();

  const memoizedFilterFn = useCallback(messageFilterFn, []);
  const { displayData: displayMessages, handleSearch } = useFilteredData(
    messages,
    memoizedFilterFn
  );

  useEffect(() => {
    if (user) getMessagesByIdUser(user?._id);
    if (user?.isAdmin) getUsers();
  }, [user, createMsgOpen, deleteMsgOpen, getMessagesByIdUser, getUsers]);

  const handleMsgAction = (e) => {
    handleMessageActionUtil(e, messages, setSelectedMsg, { toggleCreateMsg, toggleDeleteMsg });
  };

  return { displayMessages, handleSearch, handleMsgAction, toggleCreateMsg, user };
}
