import { useMemo } from "react";

/**
 * Custom hook for calculating appointment statistics
 * @param {Array} appointments - List of all appointments
 * @returns {Object} Calculated statistics
 */
export const useAppointmentStats = (appointments) => {
  const stats = useMemo(() => {
    if (!appointments || !Array.isArray(appointments)) {
      return {
        total: 0,
        pending: 0,
        confirmed: 0,
        cancelled: 0,
      };
    }

    return {
      total: appointments.length,
      pending: appointments.filter(a => a.status === 'pending').length,
      confirmed: appointments.filter(a => a.status === 'confirmed').length,
      cancelled: appointments.filter(a => a.status === 'cancelled').length,
    };
  }, [appointments]);

  return stats;
};
