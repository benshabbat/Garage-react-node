import PropTypes from "prop-types";
import { exportToCsv } from "../../../utils/exportCsv";

const FILTER_STATUSES = ['all', 'pending', 'confirmed', 'cancelled'];
const STATUS_OPTIONS = ['pending', 'confirmed', 'cancelled'];

/**
 * AppointmentsList displays the list of appointments with filters, search, and quick status update
 */
const AppointmentsList = ({
  filteredAppointments,
  filterStatus,
  setFilterStatus,
  fetchState,
  searchTerm,
  setSearchTerm,
  handleStatusChange,
}) => {
  const handleExport = () => {
    const rows = filteredAppointments?.map((a) => ({
      clientName: a.clientName,
      email: a.email,
      phone: a.phone,
      date: new Date(a.date).toLocaleDateString(),
      time: a.time,
      status: a.status,
      notes: a.notes || "",
    }));
    exportToCsv(rows, "appointments");
  };

  const renderAppointments = () => {
    if (!filteredAppointments || filteredAppointments.length === 0) {
      return (
        <div className="no-appointments">
          <div className="empty-state-icon">📅</div>
          <p>No appointments found</p>
          <small>Try adjusting your filters or search term</small>
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
        <div className="appointment-actions">
          <span className="action-label">Update status:</span>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              className={`action-status-btn action-${s} ${appointment.status === s ? "active-status" : ""}`}
              disabled={appointment.status === s}
              onClick={() => handleStatusChange(appointment._id, s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <section className="appointments-list-section">
      <div className="list-header">
        <h2>📋 Scheduled Appointments</h2>
        <div className="list-controls">
          <input
            type="search"
            className="apt-search-input"
            placeholder="Search name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
          <button className="apt-export-btn" onClick={handleExport} title="Export to CSV">
            ⬇ Export CSV
          </button>
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
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  handleStatusChange: PropTypes.func,
};

export default AppointmentsList;
