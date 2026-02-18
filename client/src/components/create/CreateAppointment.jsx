import { useAppointmentsContext } from '../../pages/appointments/AppointmentsContext';
import { ModalForm } from '../index';

const CreateAppointment = () => {
  const { 
    useCreateAppointment, 
    user, 
    users, 
    services, 
    availableCars, 
    loadingCars,
    modals 
  } = useAppointmentsContext();
  
  const { onSubmit, setFormData, formData } = useCreateAppointment();

  if (!formData) return null;

  // Build inputs for form
  const appointmentInputs = [
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
  ];

  return (
    <ModalForm
      isOpen={modals.createAppointment.isOpen}
      onClose={modals.createAppointment.handle}
      onSubmit={onSubmit}
      setFormData={setFormData}
      formData={formData}
      title="Create New Appointment"
      inputs={appointmentInputs}
      comp={
        <>
          {user?.isAdmin && (
            <div className="form-group">
              <label htmlFor="user">Customer *</label>
              <select
                id="user"
                name="user"
                value={formData.user}
                onChange={(e) => setFormData(prev => ({ ...prev, user: e.target.value, car: '' }))}
                required
                className="form-select"
              >
                <option value="">Select Customer</option>
                {users?.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.firstName} {u.lastName} - {u.phone}
                  </option>
                ))}
              </select>
              {!users || users.length === 0 ? (
                <small style={{ color: '#666', marginTop: '0.25rem', display: 'block' }}>
                  Loading customers...
                </small>
              ) : null}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="car">Car *</label>
            <select
              id="car"
              name="car"
              value={formData.car}
              onChange={(e) => setFormData(prev => ({ ...prev, car: e.target.value }))}
              required
              disabled={(user?.isAdmin && !formData.user) || loadingCars}
              className="form-select"
            >
              <option value="">
                {loadingCars ? 'Loading cars...' : 'Select Car'}
              </option>
              {availableCars?.map((car) => (
                <option key={car._id} value={car._id}>
                  {car.numberPlate} - {car.brand}
                </option>
              ))}
            </select>
            {user?.isAdmin && !formData.user && (
              <small style={{ color: '#666', marginTop: '0.25rem', display: 'block' }}>
                Select customer to see their cars
              </small>
            )}
            {user?.isAdmin && formData.user && availableCars?.length === 0 && !loadingCars && (
              <small style={{ color: '#dc3545', marginTop: '0.25rem', display: 'block' }}>
                This customer has no registered cars
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="service">Service *</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
              required
              className="form-select"
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name} - ₪{service.price}
                </option>
              ))}
            </select>
          </div>
        </>
      }
    />
  );
};

export default CreateAppointment;
