import PropTypes from "prop-types";

const FILTER_STATUSES = ['all', 'pending', 'confirmed', 'cancelled'];

/**
 * AppointmentsList displays the list of appointments with filters
 */
const AppointmentsList = ({ 
  filteredAppointments, 
  filterStatus, 
  setFilterStatus, 
  fetchState 
}) => {
  const renderAppointments = () => {
    if (!filteredAppointments || filteredAppointments.length === 0) {
      return (
        <div className="no-appointments">
          <div className="empty-state-icon">📅</div>
          <p>No appointments found</p>
          <small>Try adjusting your filters or create a new appointment</small>
        </div>
      );
    }

    return filteredAppointments.map((appointment) => (
      <div key={appointment._id} className="appointment-card">
        <div className="appointment-header">
          <h3>{appointment.clientName}</h3>
          <span className={`status status-${appointment.status}`}>
            {appointment.status}
          </span>
        </div>
        <div className="appointment-details">
          {appointment.user && (
            <p className="linked-user">
              <strong>👤 Linked User:</strong> {appointment.user.username || appointment.user.email}
            </p>
          )}
          <p><strong>📧 Email:</strong> {appointment.email}</p>
          <p><strong>📞 Phone:</strong> {appointment.phone}</p>
          <p><strong>📅 Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
          <p><strong>🕐 Time:</strong> {appointment.time}</p>
          {appointment.notes && <p><strong>📝 Notes:</strong> {appointment.notes}</p>}
        </div>
      </div>
    ));
  };

  return (
    <section className="appointments-list-section">
      <div className="list-header">
        <h2>📋 Scheduled Appointments</h2>
        <div className="filter-buttons">
          {FILTER_STATUSES.map((status) => (
            <button
              key={status}
              className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="appointments-list">
        {fetchState.isLoading && <div className="loading">⏳ Loading appointments...</div>}
        {fetchState.isSuccess && renderAppointments()}
        {fetchState.isError && (
          <div className="error">
            ⚠️ Error: {fetchState.message || 'Failed to load appointments'}
          </div>
        )}
      </div>
    </section>
  );
};

AppointmentsList.propTypes = {
  filteredAppointments: PropTypes.array,
  filterStatus: PropTypes.string.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
  fetchState: PropTypes.shape({
    isLoading: PropTypes.bool,
    isSuccess: PropTypes.bool,
    isError: PropTypes.bool,
    message: PropTypes.string,
  }).isRequired,
};

export default AppointmentsList;
