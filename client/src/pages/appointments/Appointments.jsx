import "./appointments.css";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments, createAppointment } from '../../features/appointments/appointmentSlice';
import { useState } from 'react';

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments, status } = useSelector((state) => state.appointments);
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAppointment(formData));
    setFormData({ 
      clientName: '', 
      email: '', 
      phone: '',
      date: '',
      time: '',
      notes: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderAppointments = () => {
    if (!appointments || appointments.length === 0) {
      return <p className="no-appointments">No appointments scheduled yet.</p>;
    }

    return appointments.map((appointment) => (
      <div key={appointment._id} className="appointment-card">
        <div className="appointment-header">
          <h3>{appointment.clientName}</h3>
          <span className={`status status-${appointment.status}`}>
            {appointment.status}
          </span>
        </div>
        <div className="appointment-details">
          <p><strong>Email:</strong> {appointment.email}</p>
          <p><strong>Phone:</strong> {appointment.phone}</p>
          <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          {appointment.notes && <p><strong>Notes:</strong> {appointment.notes}</p>}
        </div>
      </div>
    ));
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>Appointment Management</h1>
        <p>Schedule and manage your garage appointments</p>
      </div>

      <div className="appointments-content">
        <section className="appointment-form-section">
          <h2>Book New Appointment</h2>
          <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="clientName">Full Name *</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                placeholder="Enter your full name"
                value={formData.clientName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Time *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Additional Notes *</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Describe the service you need..."
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Book Appointment
            </button>
          </form>
        </section>

        <section className="appointments-list-section">
          <h2>Scheduled Appointments</h2>
          <div className="appointments-list">
            {status === 'loading' && <div className="loading">Loading appointments...</div>}
            {status === 'succeeded' && renderAppointments()}
            {status === 'failed' && <div className="error">Error loading appointments. Please try again.</div>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Appointments;
