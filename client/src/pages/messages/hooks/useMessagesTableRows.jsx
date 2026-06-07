import { getMomentFromUpdatedAt } from "../../../utils/dateUtils";
import { useMessagesTable } from "./useMessagesTable";

export function useMessagesTableRows() {
  const { displayMessages, handleSearch, handleMsgAction, toggleCreateMsg, user, handleExport } =
    useMessagesTable();

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
              aria-label={`Delete message from ${message?.from?.username || "unknown"}`}
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

  return { trTh, trTd, handleSearch, toggleCreateMsg, handleExport };
}
