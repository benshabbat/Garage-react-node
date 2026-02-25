import PropTypes from "prop-types";

/**
 * AppointmentStats displays statistics cards for appointments
 */
const AppointmentStats = ({ stats }) => {
  return (
    <div className="stats-container">
      <div className="stat-card stat-total">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <h3>{stats.total}</h3>
          <p>Total Appointments</p>
        </div>
      </div>
      <div className="stat-card stat-pending">
        <div className="stat-icon">⏳</div>
        <div className="stat-content">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
        </div>
      </div>
      <div className="stat-card stat-confirmed">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <h3>{stats.confirmed}</h3>
          <p>Confirmed</p>
        </div>
      </div>
      <div className="stat-card stat-cancelled">
        <div className="stat-icon">❌</div>
        <div className="stat-content">
          <h3>{stats.cancelled}</h3>
          <p>Cancelled</p>
        </div>
      </div>
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
