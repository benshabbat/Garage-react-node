import AppointmentsProvider from "./AppointmentsProvider";
import AppointmentsTable from "./AppointmentsTable";
import AppointmentModals from "./AppointmentModals";
import "./appointments.css";

const Appointments = () => {
  return (
    <AppointmentsProvider>
      <AppointmentsTable />
      <AppointmentModals />
    </AppointmentsProvider>
  );
};

export default Appointments;
