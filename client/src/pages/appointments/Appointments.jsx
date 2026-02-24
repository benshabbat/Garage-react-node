import "./appointments.css";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments, createAppointment } from '../../features/appointments/appointmentSlice';
import { getUsers } from '../../features/admin/adminSlice';

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments, fetchState } = useSelector((state) => state.appointments);
  const { users } = useSelector((state) => state.admin);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    user: '',
    clientName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(getUsers());
  }, [dispatch]);

  // Calculate statistics
  const stats = {
    total: appointments?.length || 0,
    pending: appointments?.filter(a => a.status === 'pending').length || 0,
    confirmed: appointments?.filter(a => a.status === 'confirmed').length || 0,
    cancelled: appointments?.filter(a => a.status === 'cancelled').length || 0,
  };

  // Filter appointments
  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments?.filter(a => a.status === filterStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentData = { ...formData };
    // Only include user field if a user is selected
    if (!appointmentData.user) {
      delete appointmentData.user;
    }
    dispatch(createAppointment(appointmentData));
    setFormData({ 
      user: '',
      clientName: '', 
      email: '', 
      phone: '',
      date: '',
      time: '',
      notes: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Auto-fill email and phone if user is selected
    if (name === 'user' && value) {
      const selectedUser = users.find(u => u._id === value);
      if (selectedUser) {
        setFormData(prev => ({
          ...prev,
          user: value,
          clientName: selectedUser.username || prev.clientName,
          email: selectedUser.email || prev.email,
          phone: selectedUser.phone || prev.phone,
        }));
      }
    }
  };

  const renderAppointments = () => {
    if (!filteredAppointments || filteredAppointments.length === 0) {
      return (
        <div className="no-appointments">
          <div className="empty-state-icon">📅</div>
          <p>No appointments found</p>
          <small>Try adjusting your filters or create a new appointment</small>
        </div>
      );
    }

    return filteredAppointments.map((appointment) => (
      <div key={appointment._id} className="appointment-card">
        <div className="appointment-header">
          <h3>{appointment.clientName}</h3>
          <span className={`status status-${appointment.status}`}>
            {appointment.status}
          </span>
        </div>
        <div className="appointment-details">
          {appointment.user && (
            <p className="linked-user">
              <strong>👤 Linked User:</strong> {appointment.user.username || appointment.user.email}
            </p>
          )}
          <p><strong>📧 Email:</strong> {appointment.email}</p>
          <p><strong>📞 Phone:</strong> {appointment.phone}</p>
          <p><strong>📅 Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
          <p><strong>🕐 Time:</strong> {appointment.time}</p>
          {appointment.notes && <p><strong>📝 Notes:</strong> {appointment.notes}</p>}
        </div>
      </div>
    ));
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>🗓️ Appointment Management</h1>
        <p>Schedule and manage your garage appointments</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-container">
        <div className="stat-card stat-total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Appointments</p>
          </div>
        </div>
        <div className="stat-card stat-pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card stat-confirmed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.confirmed}</h3>
            <p>Confirmed</p>
          </div>
        </div>
        <div className="stat-card stat-cancelled">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <h3>{stats.cancelled}</h3>
            <p>Cancelled</p>
          </div>
        </div>
      </div>

      <div className="appointments-content">
        <section className="appointment-form-section">
          <h2>📝 Book New Appointment</h2>
          <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="user">👤 Link to Existing User (Optional)</label>
              <select
                id="user"
                name="user"
                value={formData.user}
                onChange={handleChange}
                className="user-select"
              >
                <option value="">-- Select a user (optional) --</option>
                {users && users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username} - {user.email}
                  </option>
                ))}
              </select>
              <small className="form-hint">
                💡 Select an existing user to auto-fill their details
              </small>
            </div>

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
                  min={new Date().toISOString().split('T')[0]}
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
              ✨ Book Appointment
            </button>
          </form>
        </section>

        <section className="appointments-list-section">
          <div className="list-header">
            <h2>📋 Scheduled Appointments</h2>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </button>
              <button 
                className={`filter-btn ${filterStatus === 'confirmed' ? 'active' : ''}`}
                onClick={() => setFilterStatus('confirmed')}
              >
                Confirmed
              </button>
              <button 
                className={`filter-btn ${filterStatus === 'cancelled' ? 'active' : ''}`}
                onClick={() => setFilterStatus('cancelled')}
              >
                Cancelled
              </button>
            </div>
          </div>
          <div className="appointments-list">
            {fetchState.isLoading && <div className="loading">⏳ Loading appointments...</div>}
            {fetchState.isSuccess && renderAppointments()}
            {fetchState.isError && (
              <div className="error">
                ⚠️ Error: {fetchState.message || 'Failed to load appointments'}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Appointments;
