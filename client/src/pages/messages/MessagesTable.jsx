import Search from "../../components/table/Search";
import Table from "../../components/table/TableWithSort";
import { getMomentFromUpdatedAt } from "../../utils";
import { useContextMessages } from "./MessagesContext";
export default function MessagesTable() {
  const { modals, handleSearch, displayMessages, user, handleMsgAction } =
    useContextMessages();
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
      <button onClick={modals.createMsg.handle} className="create-button">
        Create Message
      </button>
    </div>
  );
}
