import "./ContactPage.css"

import{ useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carType: '',
    serviceType: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן יהיה הטיפול בשליחת הטופס לשרת
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>צור קשר</h1>
        <p>מלא את הפרטים ונחזור אליך בהקדם</p>
      </header>

      <div className="contact-container">
        <div className="contact-info-box">
          <div className="contact-method">
            <span className="contact-icon">📞</span>
            <div>
              <h3>טלפון</h3>
              <p>054-1234567</p>
            </div>
          </div>
          <div className="contact-method">
            <span className="contact-icon">📍</span>
            <div>
              <h3>כתובת</h3>
              <p>רחוב הרכב 1, תל אביב</p>
            </div>
          </div>
          <div className="contact-method">
            <span className="contact-icon">🕒</span>
            <div>
              <h3>שעות פעילות</h3>
              <p>א'-ה': 08:00-17:00</p>
              <p>ו': 08:00-13:00</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="success-message">
              <span className="success-icon">✅</span>
              <h3>הטופס נשלח בהצלחה!</h3>
              <p>נחזור אליך בהקדם</p>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="name">שם מלא *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">טלפון *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="carType">סוג הרכב</label>
                <input
                  type="text"
                  id="carType"
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="serviceType">סוג השירות המבוקש</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                >
                  <option value="">בחר שירות</option>
                  <option value="regular">טיפול שוטף</option>
                  <option value="electric">תיקון חשמל</option>
                  <option value="ac">טיפול מזגן</option>
                  <option value="other">אחר</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">הודעה</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <button type="submit" className="submit-button">שלח טופס</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;