import { useDashboardStore } from "../../stores/dashboardStore";
import DashboardSection from "./DashboardSection";

const AppointmentsByStatus = () => {
  const byStatus = useDashboardStore((s) => s.stats?.appointments?.byStatus);

  if (!byStatus || byStatus.length === 0) {
    return (
      <DashboardSection title="Appointments by Status">
        <div className="empty-state">No status data available</div>
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Appointments by Status">
      <div className="status-grid">
        {byStatus.map((item) => (
          <div key={item._id} className="status-item">
            <span className="status-label">{item._id || "Not Set"}</span>
            <span className="status-count">{item.count}</span>
          </div>
        ))}
      </div>
    </DashboardSection>
  );
};

export default AppointmentsByStatus;
