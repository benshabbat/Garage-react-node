import PropTypes from "prop-types";

/**
 * RecentMessages displays table of recent messages
 */
const RecentMessages = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return (
      <section className="section">
        <h2>Recent Messages</h2>
        <div className="empty-state">No messages to display</div>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>Recent Messages</h2>
      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message._id}>
                <td>{message.from?.name || message.from?.email || "System"}</td>
                <td>{message.to?.name || message.to?.email || "User"}</td>
                <td className="message-title">{message.title || "No Subject"}</td>
                <td className="message-desc">
                  {message.description
                    ? message.description.length > 50
                      ? message.description.substring(0, 50) + "..."
                      : message.description
                    : "N/A"}
                </td>
                <td>
                  <span className={`status-badge ${message.read ? "completed" : "pending"}`}>
                    {message.read ? "Read" : "Unread"}
                  </span>
                </td>
                <td>{new Date(message.createdAt).toLocaleDateString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

RecentMessages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      from: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }),
      to: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }),
      title: PropTypes.string,
      description: PropTypes.string,
      read: PropTypes.bool,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default RecentMessages;
