import { useEffect, useCallback } from "react";
import { useAppointmentsStore } from "../../../stores/appointmentsStore";
import { useAdminStore } from "../../../stores/adminStore";
import { useAppointmentForm } from "./useAppointmentForm";
import { useAppointmentStats } from "./useAppointmentStats";
import { useAppointmentFilters } from "./useAppointmentFilters";

export function useAppointmentsPage() {
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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const created = await storeCreate(appointmentForm.prepareSubmitData());
    if (created) appointmentForm.resetForm();
  }, [storeCreate, appointmentForm]);

  const handleStatusChange = useCallback(
    (id, newStatus) => storeUpdate({ id, data: { status: newStatus } }),
    [storeUpdate]
  );

  return {
    users,
    stats,
    appointmentForm,
    appointmentFilters,
    handleSubmit,
    handleStatusChange,
    fetchState: { isLoading, isError, message },
  };
}
