import "./appointment.css"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAppointment } from '../features/appointments/appointmentSlice';

const AppointmentForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // בדיקת שם
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'נא להזין שם מלא';
    }
    
    // בדיקת אימייל
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'נא להזין כתובת אימייל תקינה';
    }

    // בדיקת טלפון
    const phoneRegex = /^0[2-9]\d{7,8}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'נא להזין מספר טלפון תקין';
    }

    // בדיקת תאריך
    if (!formData.date) {
      newErrors.date = 'נא לבחור תאריך';
    }

    // בדיקת שעה
    if (!formData.time) {
      newErrors.time = 'נא לבחור שעה';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // יצירת אובייקט תאריך משולב
        const dateTime = new Date(`${formData.date}T${formData.time}`);
        
        await dispatch(createAppointment({
          ...formData,
          date: dateTime
        })).unwrap();
        
        setSubmitted(true);
        // איפוס הטופס
        setFormData({
          clientName: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          notes: ''
        });
        
        // הצגת הודעת הצלחה למשך 3 שניות
        setTimeout(() => setSubmitted(false), 3000);
      } catch (error) {
        setErrors({ submit: 'אירעה שגיאה בשמירת התור. נא לנסות שוב.' });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // ניקוי שגיאות בעת הקלדה
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="appointment-form-container">
      <h2>קביעת תור חדש</h2>
      
      {submitted && (
        <div className="success-message">
          התור נקבע בהצלחה! ✓
        </div>
      )}
      
      {errors.submit && (
        <div className="error-message">
          {errors.submit}
        </div>
      )}

      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="clientName">שם מלא</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className={errors.clientName ? 'error' : ''}
            placeholder="ישראל ישראלי"
          />
          {errors.clientName && <span className="error-text">{errors.clientName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">דואר אלקטרוני</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="your@email.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">טלפון</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            placeholder="050-0000000"
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">תאריך</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="time">שעה</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={errors.time ? 'error' : ''}
              min="09:00"
              max="18:00"
              step="1800"
            />
            {errors.time && <span className="error-text">{errors.time}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">הערות נוספות</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="הערות נוספות לגבי התור..."
            rows="3"
          />
        </div>

        <button type="submit" className="submit-button">
          קביעת תור
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;