import { useAppointmentsContext } from '../../pages/appointments/AppointmentsContext';
import { ModalForm } from '../index';

const EditAppointment = () => {
  const { useEditAppointment, selectedAppointment, modals } = useAppointmentsContext();
  const { onSubmit, setFormData, formData } = useEditAppointment();

  if (!formData || !selectedAppointment) return null;

  return (
    <ModalForm
      isOpen={modals.editAppointment.isOpen}
      onClose={modals.editAppointment.handle}
      onSubmit={onSubmit}
      setFormData={setFormData}
      formData={formData}
      title="Edit Appointment"
      inputs={[
        {
          name: "appointmentDate",
          type: "datetime-local",
          min: new Date().toISOString().slice(0, 16),
          placeholder: "Date & Time",
        },
        {
          name: "notes",
          type: "text",
          placeholder: "Add notes for appointment...",
        },
      ]}
      options={[
        { value: "scheduled", label: "Scheduled" },
        { value: "confirmed", label: "Confirmed" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" },
      ]}
      nameSelect="status"
      comp={
        <>
          <div className="form-group">
            <label>Customer</label>
            <input 
              type="text" 
              value={`${selectedAppointment.user?.firstName || ''} ${selectedAppointment.user?.lastName || ''}`}
              disabled
              className="form-input disabled"
            />
          </div>

          <div className="form-group">
            <label>Car</label>
            <input 
              type="text" 
              value={`${selectedAppointment.car?.numberPlate || ''} - ${selectedAppointment.car?.brand || ''}`}
              disabled
              className="form-input disabled"
            />
          </div>

          <div className="form-group">
            <label>Service</label>
            <input 
              type="text" 
              value={`${selectedAppointment.service?.name || ''} - ₪${selectedAppointment.service?.price || ''}`}
              disabled
              className="form-input disabled"
            />
          </div>
        </>
      }
    />
  );
};

export default EditAppointment;
