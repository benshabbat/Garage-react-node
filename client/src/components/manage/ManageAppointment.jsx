import "../manage/manage.css";
import { OpenModal } from "../index";
import { useAppointmentsContext } from "../../pages/appointments/AppointmentsContext";
import ButtonManage from "./ButtonManage";
import FormManage from "./FormManage";
import EditAppointment from "../edit/EditAppointment";

const ManageAppointment = () => {
  const { handleAppointmentAction, selectedAppointment, modals } =
    useAppointmentsContext();

  return (
    <OpenModal
      comp={
        <>
          <FormManage handle={modals.manageAppointment.handle}>
            <ButtonManage
              name="editAppointment"
              type="edit"
              handle={handleAppointmentAction}
              value={selectedAppointment?._id}
              content="Edit Appointment"
            />
            <ButtonManage
              name="deleteAppointment"
              type="delete"
              handle={handleAppointmentAction}
              value={selectedAppointment?._id}
              content="Delete Appointment"
            />
          </FormManage>
          <EditAppointment />
        </>
      }
      isOpen={modals.manageAppointment.isOpen}
    />
  );
};

export default ManageAppointment;
