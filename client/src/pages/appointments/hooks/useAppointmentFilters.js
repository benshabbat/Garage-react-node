import { useState, useMemo } from "react";

export const useAppointmentFilters = (appointments) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = useMemo(() => {
    if (!appointments || !Array.isArray(appointments)) return [];

    return appointments.filter((a) => {
      const matchesStatus = filterStatus === "all" || a.status === filterStatus;
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !term ||
        a.clientName?.toLowerCase().includes(term) ||
        a.email?.toLowerCase().includes(term) ||
        a.phone?.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [appointments, filterStatus, searchTerm]);

  return {
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    filteredAppointments,
  };
};
