import "./appointment.css"

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments } from '../features/appointments/appointmentSlice';

const Calendar = () => {
  const dispatch = useDispatch();
  const { appointments, status } = useSelector((state) => state.appointments);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  const renderAppointments = () => {
    return appointments.map((appointment) => (
      <div key={appointment._id} className="appointment-item">
        <p>Client: {appointment.clientName}</p>
        <p>Date: {new Date(appointment.date).toLocaleString()}</p>
        <p>Status: {appointment.status}</p>
      </div>
    ));
  };

  return (
    <div className="calendar">
      <h2>Appointments Calendar</h2>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' && renderAppointments()}
      {status === 'failed' && <div>Error loading appointments</div>}
    </div>
  );
};

export default Calendar;