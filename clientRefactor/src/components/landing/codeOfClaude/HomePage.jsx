import './HomePage.css';

const HomePage = () => {
  const services = [
    { icon: '🔧', title: "טיפול שוטף", description: "טיפולים תקופתיים לרכב" },
    { icon: '🚗', title: "דיאגנוסטיקה", description: "בדיקת מערכות ממוחשבת" },
    { icon: '⚡', title: "שירות מהיר", description: "תיקונים דחופים ללא תור" }
  ];

  return (
    <div className="homepage" dir="rtl">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>ברוכים הבאים למוסך שלנו</h1>
          <p className="subtitle">השירות המקצועי והאמין ביותר לרכב שלך</p>
          <div className="button-group">
            <button className="btn btn-primary">קבע תור</button>
            <button className="btn btn-secondary">התחבר</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2>השירותים שלנו</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <h2>צור קשר</h2>
          <div className="contact-card">
            <div className="contact-info">
              <div className="phone-info">
                <span className="icon">📞</span>
                <span>טלפון: 03-1234567</span>
              </div>
              <div className="hours-info">
                <h4>שעות פעילות:</h4>
                <p>ראשון-חמישי: 08:00-18:00</p>
                <p>שישי: 08:00-13:00</p>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <label>שם מלא</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>טלפון</label>
                <input type="tel" required />
              </div>
              <div className="form-group">
                <label>הודעה</label>
                <textarea required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">שלח הודעה</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;