import "./ContactPage.css";
import { useState } from "react";
import { createReqService } from "../../../features/user/userSlice";
import { useDispatch } from "react-redux";


//TODO: OK NEED TO CREATE FOR ADMIN PAGE WITH MASSAGES FROM GUESTS

const ContactPage = () => {
  const ADMIN = "63e14deca4340e45d23f20b2";
  const [formData, setFormData] = useState({
    from: "",
    to: ADMIN,
    title: "",
    description: "",
  });
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(createReqService(formData));
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
        {/* <Contact/> */}
        <form className="contact-form" onSubmit={onSubmit}>
          {submitted ? (
            <div className="success-message">
              <span className="success-icon">✅</span>
              <h3>הטופס נשלח בהצלחה!</h3>
              <p>נחזור אליך בהקדם</p>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>שם מלא *</label>
                <input
                  type="text"
                  name="from"
                  // value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* <div className="form-group">
                <label htmlFor="phone">טלפון *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div> */}

              {/* <div className="form-group">
                <label htmlFor="carType">סוג הרכב</label>
                <input
                  type="text"
                  id="carType"
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                />
              </div> */}

              <div className="form-group">
                <label htmlFor="serviceType">סוג השירות המבוקש</label>
                <select
                  name="title"
                  // value={formData.serviceType}
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
                <label>הודעה</label>
                <textarea
                  name="description"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <button type="submit" className="submit-button">
                שלח טופס
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
