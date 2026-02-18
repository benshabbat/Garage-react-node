import { useState } from "react";
import { useAppointmentsContext } from "./AppointmentsContext";

export default function AppointmentsTable() {
  const {
    displayAppointments,
    handleAppointmentAction,
    handleStatusChange,
    handleSearch,
    status,
    user,
    modals,
  } = useAppointmentsContext();

  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "status-scheduled";
      case "confirmed":
        return "status-confirmed";
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  const filteredAppointments =
    filterStatus === "all"
      ? displayAppointments
      : displayAppointments.filter((app) => app.status === filterStatus);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("he-IL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (status === "loading") {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>Appointments Management</h1>
      </div>

      <div className="appointments-filters">
        <div>
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search by customer, car, service..."
            onChange={(e) => handleSearch(e.target.value)}
            className="filter-select"
          />
        </div>
        <div>
          <label>Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="appointments-table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Customer</th>
              <th>Car</th>
              <th>Service</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No appointments to display
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{formatDate(appointment.appointmentDate)}</td>
                  <td>
                    {appointment.user?.firstName} {appointment.user?.lastName}
                    <br />
                    <small>{appointment.user?.phone}</small>
                  </td>
                  <td>
                    {appointment.car?.numberPlate}
                    <br />
                    <small>{appointment.car?.brand}</small>
                  </td>
                  <td>
                    {appointment.service?.name}
                    <br />
                    <small>₪{appointment.service?.price}</small>
                  </td>
                  <td>
                    <select
                      value={appointment.status}
                      onChange={(e) =>
                        handleStatusChange(appointment._id, e.target.value)
                      }
                      className={`status-select ${getStatusColor(
                        appointment.status
                      )}`}
                      disabled={!user?.isAdmin}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{appointment.notes || "-"}</td>
                  <td className="actions-cell">
                    <button
                      className="btn-manage"
                      value={appointment._id}
                      onClick={handleAppointmentAction}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={modals.createAppointment.handle}
        className="create-button"
      >
        Create Appointment
      </button>
    </div>
  );
}
