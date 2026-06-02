import { useEffect, useCallback } from "react";
import { AppointmentsContext } from "./AppointmentsContext";
import { useAppointmentsStore } from "../../stores/appointmentsStore";
import { useAdminStore } from "../../stores/adminStore";
import { useAppointmentForm } from "./hooks/useAppointmentForm";
import { useAppointmentStats } from "./hooks/useAppointmentStats";
import { useAppointmentFilters } from "./hooks/useAppointmentFilters";
import PropTypes from "prop-types";

/**
 * AppointmentsProvider manages appointment state and provides it to child components
 * Following the established provider pattern used across the application
 */
export default function AppointmentsProvider({ children }) {
  const appointments = useAppointmentsStore((s) => s.appointments);
  const fetchState = { isLoading: useAppointmentsStore((s) => s.isLoading), isError: useAppointmentsStore((s) => s.isError), message: useAppointmentsStore((s) => s.message) };
  const storeFetch = useAppointmentsStore((s) => s.fetchAppointments);
  const storeCreate = useAppointmentsStore((s) => s.createAppointment);
  const storeUpdate = useAppointmentsStore((s) => s.updateAppointment);
  const users = useAdminStore((s) => s.users);
  const storeGetUsers = useAdminStore((s) => s.getUsers);

  useEffect(() => {
    storeFetch();
    storeGetUsers();
  }, [storeFetch, storeGetUsers]);

  // Form management
  const appointmentForm = useAppointmentForm(users);

  // Statistics calculation
  const stats = useAppointmentStats(appointments);

  // Filter management
  const appointmentFilters = useAppointmentFilters(appointments);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentData = appointmentForm.prepareSubmitData();
    storeCreate(appointmentData);
    appointmentForm.resetForm();
  };

  const handleStatusChange = useCallback(
    (id, newStatus) => {
      storeUpdate({ id, data: { status: newStatus } });
    },
    [storeUpdate]
  );

  const value = {
    // Data
    appointments,
    users,
    fetchState,
    stats,
    
    // Form
    formData: appointmentForm.formData,
    handleChange: appointmentForm.handleChange,
    handleSubmit,
    
    // Filters
    filteredAppointments: appointmentFilters.filteredAppointments,
    filterStatus: appointmentFilters.filterStatus,
    setFilterStatus: appointmentFilters.setFilterStatus,
    searchTerm: appointmentFilters.searchTerm,
    setSearchTerm: appointmentFilters.setSearchTerm,

    // Actions
    handleStatusChange,
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
}

AppointmentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
