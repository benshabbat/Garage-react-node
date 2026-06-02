import { useEffect, useCallback } from "react";
import Search from "../../components/table/Search";
import Table from "../../components/table/TableWithSort";
import { getMomentFromUpdatedAt } from "../../utils";
import { useUserStore } from "../../stores/userStore";
import { useAdminStore } from "../../stores/adminStore";
import { useMessagesUIStore } from "../../stores/uiStores";
import useFilteredData from "../../hooks/useFilteredData";
import { messageFilterFn } from "./utils/messageValidation";
import { handleMessageAction as handleMessageActionUtil } from "./utils/messageHandlerUtils";

export default function MessagesTable() {
  const messages = useUserStore((s) => s.messages);
  const user = useUserStore((s) => s.user);
  const getMessagesByIdUser = useUserStore((s) => s.getMessagesByIdUser);
  const getUsers = useAdminStore((s) => s.getUsers);
  const { createMsgOpen, deleteMsgOpen, toggleCreateMsg, setSelectedMsg, toggleCreateMsg: tc, toggleDeleteMsg } = useMessagesUIStore();

  const memoizedFilterFn = useCallback(messageFilterFn, []);
  const { displayData: displayMessages, handleSearch } = useFilteredData(messages, memoizedFilterFn);

  useEffect(() => {
    if (user) getMessagesByIdUser(user?._id);
    if (user?.isAdmin) getUsers();
  }, [user, createMsgOpen, deleteMsgOpen, getMessagesByIdUser, getUsers]);

  const handleMsgAction = (e) => {
    handleMessageActionUtil(e, messages, setSelectedMsg, { toggleCreateMsg: tc, toggleDeleteMsg });
  };
  const trTh = (
    <tr>
      <th>Actions</th>
      <th>From</th>
      <th>To</th>
      <th>Title</th>
      <th>Description</th>
      <th>Date</th>
    </tr>
  );

  const trTd = displayMessages?.map((message) => {
    const { theDate } = getMomentFromUpdatedAt(message.updatedAt);
    return (
      <tr key={message?._id}>
        {user?.isAdmin && (
          <td data-label="Actions">
            <button
              name="deleteMessage"
              value={message?._id}
              onClick={handleMsgAction}
            >
              Delete
            </button>
          </td>
        )}
        <td data-label="From">{message?.from?.username}</td>
        <td data-label="To">{message?.to?.username}</td>
        <td data-label="Title">{message?.title}</td>
        <td data-label="Description">{message?.description}</td>
        <td data-label="Date">{theDate}</td>
      </tr>
    );
  });

  return (
    <div className="table-container">
      <Search handleSearch={handleSearch} name={"Messages"} />
      <Table trTh={trTh} trTd={trTd} />
      <button onClick={toggleCreateMsg} className="create-button">
        Create Message
      </button>
    </div>
  );
}
