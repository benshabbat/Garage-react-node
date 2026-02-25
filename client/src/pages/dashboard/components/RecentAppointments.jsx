import PropTypes from "prop-types";

/**
 * RecentAppointments displays table of recent appointments
 */
const RecentAppointments = ({ appointments }) => {
  if (!appointments || appointments.length === 0) {
    return (
      <section className="section">
        <h2>Recent Appointments</h2>
        <div className="empty-state">No appointments to display</div>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>Recent Appointments</h2>
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
                  {appointment.notes
                    ? appointment.notes.length > 40
                      ? appointment.notes.substring(0, 40) + "..."
                      : appointment.notes
                    : "None"}
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
    </section>
  );
};

RecentAppointments.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      clientName: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      notes: PropTypes.string,
      status: PropTypes.string,
    })
  ),
};

export default RecentAppointments;
