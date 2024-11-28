
export default function MessagesTable() {
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
        {(filterMessages || messages)?.map(message => 
          <MessageRow key={message._id} message={message} />
        )}
      </tbody>
    </table>
  </section>
  )
}

const MessageRow = ({ message }) => (
    <tr key={message?._id}>
      {user?.isAdmin && (
        <td data-label="Actions">
          <button
            name="deleteMessage"
            onClick={() => handleDelete(message?._id)}
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
  );