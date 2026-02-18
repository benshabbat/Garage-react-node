import ManageAppointment from "../../components/manage/ManageAppointment";
import { CreateAppointment } from "../../components";
import { Delete } from "../../components";
import { useAppointmentsContext } from "./AppointmentsContext";

export default function AppointmentModals() {
  const { modals, selectedAppointment, useDeleteAppointment } =
    useAppointmentsContext();

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <CreateAppointment />
      <ManageAppointment />
      {modals.deleteAppointment.isOpen && selectedAppointment && (
        <Delete
          onClose={modals.deleteAppointment.handle}
          onConfirm={useDeleteAppointment}
          itemName={`Appointment on ${formatDate(
            selectedAppointment?.appointmentDate
          )}`}
        />
      )}
    </>
  );
}
