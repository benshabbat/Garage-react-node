import "./appointments.css";
import AppointmentsProvider from "./AppointmentsProvider";
import { useAppointmentsContext } from "./AppointmentsContext";
import AppointmentStats from "./components/AppointmentStats";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentsList from "./components/AppointmentsList";

/**
 * AppointmentsContent component that uses context to access data
 * Separated from Appointments to consume context after provider wraps it
 */
const AppointmentsContent = () => {
  const {
    stats,
    formData,
    users,
    handleChange,
    handleSubmit,
    filteredAppointments,
    filterStatus,
    setFilterStatus,
    fetchState,
  } = useAppointmentsContext();

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>🗓️ Appointment Management</h1>
        <p>Schedule and manage your garage appointments</p>
      </div>

      <AppointmentStats stats={stats} />

      <div className="appointments-content">
        <AppointmentForm
          formData={formData}
          users={users}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <AppointmentsList
          filteredAppointments={filteredAppointments}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          fetchState={fetchState}
        />
      </div>
    </div>
  );
};

/**
 * Appointments page component
 * Wraps content with AppointmentsProvider following the application's provider pattern
 */
const Appointments = () => {
  return (
    <AppointmentsProvider>
      <AppointmentsContent />
    </AppointmentsProvider>
  );
};

export default Appointments;
