import "./appointment.css"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAppointment } from '../features/appointments/appointmentSlice';

const AppointmentForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAppointment(formData));
    setFormData({ clientName: '', email: '', date: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="clientName"
        placeholder="Your Name"
        value={formData.clientName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;