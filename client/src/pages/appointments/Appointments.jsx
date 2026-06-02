import "./appointments.css";
import { useEffect, useCallback } from "react";
import { useAppointmentsStore } from "../../stores/appointmentsStore";
import { useAdminStore } from "../../stores/adminStore";
import { useAppointmentForm } from "./hooks/useAppointmentForm";
import { useAppointmentStats } from "./hooks/useAppointmentStats";
import { useAppointmentFilters } from "./hooks/useAppointmentFilters";
import AppointmentStats from "./components/AppointmentStats";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentsList from "./components/AppointmentsList";

const Appointments = () => {
  const appointments = useAppointmentsStore((s) => s.appointments);
  const isLoading = useAppointmentsStore((s) => s.isLoading);
  const isError = useAppointmentsStore((s) => s.isError);
  const message = useAppointmentsStore((s) => s.message);
  const storeFetch = useAppointmentsStore((s) => s.fetchAppointments);
  const storeCreate = useAppointmentsStore((s) => s.createAppointment);
  const storeUpdate = useAppointmentsStore((s) => s.updateAppointment);
  const users = useAdminStore((s) => s.users);
  const storeGetUsers = useAdminStore((s) => s.getUsers);

  useEffect(() => {
    storeFetch();
    storeGetUsers();
  }, [storeFetch, storeGetUsers]);

  const appointmentForm = useAppointmentForm(users);
  const stats = useAppointmentStats(appointments);
  const appointmentFilters = useAppointmentFilters(appointments);

  const handleSubmit = (e) => {
    e.preventDefault();
    storeCreate(appointmentForm.prepareSubmitData());
    appointmentForm.resetForm();
  };

  const handleStatusChange = useCallback(
    (id, newStatus) => storeUpdate({ id, data: { status: newStatus } }),
    [storeUpdate]
  );

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>🗓️ Appointment Management</h1>
        <p>Schedule and manage your garage appointments</p>
      </div>
      <AppointmentStats stats={stats} />
      <div className="appointments-content">
        <AppointmentForm
          formData={appointmentForm.formData}
          users={users}
          handleChange={appointmentForm.handleChange}
          handleSubmit={handleSubmit}
        />
        <AppointmentsList
          filteredAppointments={appointmentFilters.filteredAppointments}
          filterStatus={appointmentFilters.filterStatus}
          setFilterStatus={appointmentFilters.setFilterStatus}
          fetchState={{ isLoading, isError, message }}
          searchTerm={appointmentFilters.searchTerm}
          setSearchTerm={appointmentFilters.setSearchTerm}
          handleStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default Appointments;
