import { useDashboardStore } from "../../stores/dashboardStore";
import { truncate } from "../../utils/formatters";
import DashboardSection from "./DashboardSection";

const RecentAppointments = () => {
  const appointments = useDashboardStore((s) => s.stats?.appointments?.recent);

  if (!appointments || appointments.length === 0) {
    return (
      <DashboardSection title="Recent Appointments">
        <div className="empty-state">No appointments to display</div>
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Recent Appointments">
      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="client-name">{appointment.clientName || "Unknown"}</td>
                <td className="email-cell">{appointment.email || "N/A"}</td>
                <td className="phone-cell">{appointment.phone || "N/A"}</td>
                <td>
                  {new Date(appointment.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="time-cell">{appointment.time}</td>
                <td className="notes-cell">
                  {truncate(appointment.notes, 40) || "None"}
                </td>
                <td>
                  <span className={`status-badge ${appointment.status}`}>
                    {appointment.status || "pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardSection>
  );
};

export default RecentAppointments;
