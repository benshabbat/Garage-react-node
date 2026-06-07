import { useDashboardStore } from "../../stores/dashboardStore";
import { truncate } from "../../utils/formatters";
import DashboardSection from "./DashboardSection";

const RecentMessages = () => {
  const messages = useDashboardStore((s) => s.stats?.messages?.recent);

  if (!messages || messages.length === 0) {
    return (
      <DashboardSection title="Recent Messages">
        <div className="empty-state">No messages to display</div>
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Recent Messages">
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
                <td className="message-desc">{truncate(message.description, 50) || "N/A"}</td>
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
    </DashboardSection>
  );
};

export default RecentMessages;
