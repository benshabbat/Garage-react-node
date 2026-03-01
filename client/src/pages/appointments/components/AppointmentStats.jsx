import PropTypes from "prop-types";

const STAT_CARDS = [
  { key: "total",     icon: "📊", label: "Total Appointments", className: "stat-total" },
  { key: "pending",   icon: "⏳", label: "Pending",            className: "stat-pending" },
  { key: "confirmed", icon: "✅", label: "Confirmed",          className: "stat-confirmed" },
  { key: "cancelled", icon: "❌", label: "Cancelled",          className: "stat-cancelled" },
];

/**
 * AppointmentStats displays statistics cards for appointments
 */
const AppointmentStats = ({ stats }) => {
  return (
    <div className="stats-container">
      {STAT_CARDS.map(({ key, icon, label, className }) => (
        <div key={key} className={`stat-card ${className}`}>
          <div className="stat-icon">{icon}</div>
          <div className="stat-content">
            <h3>{stats[key]}</h3>
            <p>{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

AppointmentStats.propTypes = {
  stats: PropTypes.shape({
    total: PropTypes.number.isRequired,
    pending: PropTypes.number.isRequired,
    confirmed: PropTypes.number.isRequired,
    cancelled: PropTypes.number.isRequired,
  }).isRequired,
};

export default AppointmentStats;
