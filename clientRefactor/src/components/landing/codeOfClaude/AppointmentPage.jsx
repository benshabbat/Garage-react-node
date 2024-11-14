// AppointmentPage.jsx
import { useState } from 'react';
import './AppointmentPage.css';

const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [carDetails, setCarDetails] = useState({
    manufacturer: '',
    model: '',
    year: '',
    licenseNumber: ''
  });

  const services = [
    { id: 1, name: 'טיפול 10,000 ק"מ', duration: '60', price: '350' },
    { id: 2, name: 'טיפול 20,000 ק"מ', duration: '90', price: '650' },
    { id: 3, name: 'החלפת שמן ומסננים', duration: '45', price: '250' },
    { id: 4, name: 'טיפול מערכת בלמים', duration: '60', price: '400' },
    { id: 5, name: 'בדיקת מערכות ממוחשבת', duration: '30', price: '200' }
  ];

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      selectedDate,
      selectedTime,
      selectedService,
      carDetails
    });
  };

  return (
    <div className="appointment-page" dir="rtl">
      <div className="container">
        <h1>קביעת תור לטיפול</h1>
        
        <form className="appointment-form glass-effect" onSubmit={handleSubmit}>
          {/* Service Selection */}
          <section className="form-section">
            <h2>בחירת שירות</h2>
            <div className="services-grid">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className={`service-option glass-card ${selectedService === service.id ? 'selected' : ''}`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <h3>{service.name}</h3>
                  <div className="service-details">
                    <span>⏱️ {service.duration} דקות</span>
                    <span>💰 {service.price} ₪</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Date & Time Selection */}
          <section className="form-section">
            <h2>בחירת מועד</h2>
            <div className="date-time-grid">
              <div className="form-group">
                <label>תאריך</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label>שעה</label>
                <select 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                >
                  <option value="">בחר שעה</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Car Details */}
          <section className="form-section">
            <h2>פרטי הרכב</h2>
            <div className="car-details-grid">
              <div className="form-group">
                <label>יצרן</label>
                <input
                  type="text"
                  value={carDetails.manufacturer}
                  onChange={(e) => setCarDetails({...carDetails, manufacturer: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>דגם</label>
                <input
                  type="text"
                  value={carDetails.model}
                  onChange={(e) => setCarDetails({...carDetails, model: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>שנת ייצור</label>
                <input
                  type="number"
                  min="1990"
                  max={new Date().getFullYear()}
                  value={carDetails.year}
                  onChange={(e) => setCarDetails({...carDetails, year: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>מספר רישוי</label>
                <input
                  type="text"
                  value={carDetails.licenseNumber}
                  onChange={(e) => setCarDetails({...carDetails, licenseNumber: e.target.value})}
                  required
                />
              </div>
            </div>
          </section>

          <button type="submit" className="submit-btn">קבע תור</button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentPage;