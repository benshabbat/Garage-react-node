import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppointments, createAppointment } from "../../features/appointments/appointmentSlice";
import { getUsers } from "../../features/admin/adminSlice";
import { AppointmentsContext } from "./AppointmentsContext";
import { useAppointmentForm } from "./hooks/useAppointmentForm";
import { useAppointmentStats } from "./hooks/useAppointmentStats";
import { useAppointmentFilters } from "./hooks/useAppointmentFilters";
import PropTypes from "prop-types";

/**
 * AppointmentsProvider manages appointment state and provides it to child components
 * Following the established provider pattern used across the application
 */
export default function AppointmentsProvider({ children }) {
  const dispatch = useDispatch();
  const { appointments, fetchState } = useSelector((state) => state.appointments);
  const { users } = useSelector((state) => state.admin);

  // Load appointments and users on mount
  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(getUsers());
  }, [dispatch]);

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
    dispatch(createAppointment(appointmentData));
    appointmentForm.resetForm();
  };

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
