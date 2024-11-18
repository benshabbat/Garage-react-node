// components/HomePage.jsx
// import React from 'react';
// import Hero from './Hero';
// import Services from './Services';
// import Features from './Features';
// // import CTA from './CTA';
import './home.css';

const Home = () => {
  return (
    <div className="homepage">
      <Hero />
      <Services />
      <Features />
      <CTA />
    </div>
  );
};

// components/Hero.jsx
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Professional Auto Service</h1>
          <p>Your trusted partner for all automotive needs</p>
          <div className="button-group">
            <button className="button button-primary">Book Now</button>
            <button className="button button-secondary">Our Services</button>
          </div>
        </div>
      </div>
    </section>
  );
};

// components/Services.jsx
const Services = () => {
  const serviceList = [
    {
      icon: "🔧",
      title: "Car Maintenance",
      description: "Professional auto repair services"
    },
    {
      icon: "⚡",
      title: "Quick Service",
      description: "Efficient and reliable repairs"
    },
    {
      icon: "📋",
      title: "Vehicle Reports",
      description: "Detailed service history"
    },
    {
      icon: "📅",
      title: "Online Booking",
      description: "Easy appointment scheduling"
    }
  ];

  return (
    <section className="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {serviceList.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// components/Features.jsx
const Features = () => {
  const featureList = [
    {
      icon: "💳",
      title: "Online Payments",
      description: "Secure and convenient payment options for all services"
    },
    {
      icon: "👤",
      title: "Customer Portal",
      description: "Access your vehicle history and schedule appointments"
    },
    {
      icon: "🚗",
      title: "Expert Mechanics",
      description: "Certified professionals for quality service"
    }
  ];

  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          {featureList.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-header">
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
              </div>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// components/CTA.jsx
const CTA = () => {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-container">
          <h2>Ready to Get Started?</h2>
          <p>Book your appointment today and experience our professional service</p>
          <button className="button button-primary">Schedule Service</button>
        </div>
      </div>
    </section>
  );
};

export default Home;

// styles.css
/* CSS remains the same as in the previous example */