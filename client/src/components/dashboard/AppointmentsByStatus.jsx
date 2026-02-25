import { useDashboardContext } from "../../pages/dashboard/DashboardContext";

/**
 * AppointmentsByStatus displays appointments breakdown by status
 * Uses dashboard context to access data without props drilling
 */
const AppointmentsByStatus = () => {
  const { stats } = useDashboardContext();
  const { byStatus } = stats.appointments;

  if (!byStatus || byStatus.length === 0) {
    return (
      <section className="section">
        <h2>Appointments by Status</h2>
        <div className="empty-state">No status data available</div>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>Appointments by Status</h2>
      <div className="status-grid">
        {byStatus.map((item) => (
          <div key={item._id} className="status-item">
            <span className="status-label">{item._id || "Not Set"}</span>
            <span className="status-count">{item.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppointmentsByStatus;
