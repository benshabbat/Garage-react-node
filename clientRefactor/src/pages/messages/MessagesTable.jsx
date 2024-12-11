import { useContextMessages } from "./MessagesConetxt";

//TODO: USE WITH SEARCH AND TABLE GENERIC
export default function MessagesTable() {
  const { displayMessages,user,handleMsgAction } = useContextMessages();
  return (
    <section className="table__body">
      <table>
        <thead>
          <tr>
            {user?.isAdmin && <th>Actions</th>}
            <th>From</th>
            <th>To</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {displayMessages?.map((message) => (
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
              <td data-label="Date">{message?.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
