import PropTypes from "prop-types";

const CONTACT_FIELDS = [
  { id: "clientName", name: "clientName", type: "text",  label: "Full Name *",       placeholder: "Enter your full name" },
  { id: "email",      name: "email",      type: "email", label: "Email Address *",   placeholder: "Enter your email" },
  { id: "phone",      name: "phone",      type: "tel",   label: "Phone Number *",    placeholder: "Enter your phone number" },
];

/**
 * AppointmentForm handles the booking form for new appointments
 */
const AppointmentForm = ({ formData, users, handleChange, handleSubmit }) => {
  return (
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

        {CONTACT_FIELDS.map(({ id, name, type, label, placeholder }) => (
          <div key={id} className="form-group">
            <label htmlFor={id}>{label}</label>
            <input
              type={type}
              id={id}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

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
  );
};

AppointmentForm.propTypes = {
  formData: PropTypes.shape({
    user: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AppointmentForm;
