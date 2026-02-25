import { useState, useMemo } from "react";

/**
 * Custom hook for filtering appointments
 * @param {Array} appointments - List of all appointments
 * @returns {Object} Filter state and filtered data
 */
export const useAppointmentFilters = (appointments) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAppointments = useMemo(() => {
    if (!appointments || !Array.isArray(appointments)) {
      return [];
    }

    return filterStatus === 'all'
      ? appointments
      : appointments.filter(a => a.status === filterStatus);
  }, [appointments, filterStatus]);

  return {
    filterStatus,
    setFilterStatus,
    filteredAppointments,
  };
};
