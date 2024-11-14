import "./contactLanding.css"
import {useState} from 'react'

export default function ContactLanding() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>Have any questions? We'd love to hear from you.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          
          <div className="info-items">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h3>Our Location</h3>
                <p>123 Auto Street, City, Country</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <h3>Phone Number</h3>
                <p>+1 234 567 8900</p>
                <p>+1 234 567 8901</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <h3>Email Address</h3>
                <p>service@autogarage.com</p>
                <p>support@autogarage.com</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">⏰</span>
              <div>
                <h3>Working Hours</h3>
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p>Sat: 9:00 AM - 3:00 PM</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="social-links">
            <a href="#" className="social-icon">👥 Facebook</a>
            <a href="#" className="social-icon">📸 Instagram</a>
            <a href="#" className="social-icon">🐦 Twitter</a>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">👤 Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">📧 Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="johndoe@example.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">📞 Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">📝 Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">💭 Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
                rows="6"
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              📤 Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};



