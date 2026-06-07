import { useState } from "react";
import "./appointments.css";
import { useAppointmentsPage } from "./hooks/useAppointmentsPage";
import AppointmentStats from "./components/AppointmentStats";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentsList from "./components/AppointmentsList";
import AppointmentCalendar from "./components/AppointmentCalendar";

const Appointments = () => {
  const [view, setView] = useState("list");

  const {
    users,
    stats,
    appointmentForm,
    appointmentFilters,
    handleSubmit,
    handleStatusChange,
    fetchState,
  } = useAppointmentsPage();

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>🗓️ Appointment Management</h1>
        <p>Schedule and manage your garage appointments</p>
      </div>
      <AppointmentStats stats={stats} />

      <div className="apt-view-toggle">
        <button
          className={`apt-view-btn${view === "list" ? " active" : ""}`}
          onClick={() => setView("list")}
        >
          📋 List
        </button>
        <button
          className={`apt-view-btn${view === "calendar" ? " active" : ""}`}
          onClick={() => setView("calendar")}
        >
          📅 Calendar
        </button>
      </div>

      {view === "calendar" ? (
        <AppointmentCalendar appointments={appointmentFilters.filteredAppointments} />
      ) : (
        <div className="appointments-content">
          <AppointmentForm
            formData={appointmentForm.formData}
            users={users}
            handleChange={appointmentForm.handleChange}
            handleSubmit={handleSubmit}
            isLoading={fetchState.isLoading}
          />
          <AppointmentsList
            filteredAppointments={appointmentFilters.filteredAppointments}
            filterStatus={appointmentFilters.filterStatus}
            setFilterStatus={appointmentFilters.setFilterStatus}
            fetchState={fetchState}
            searchTerm={appointmentFilters.searchTerm}
            setSearchTerm={appointmentFilters.setSearchTerm}
            handleStatusChange={handleStatusChange}
          />
        </div>
      )}
    </div>
  );
};

export default Appointments;
