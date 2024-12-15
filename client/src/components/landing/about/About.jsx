import "./about.css";
import ServicesLanding from "../servicesLanding/ServicesLanding";
const About = () => {
  return (
    <div id="about" className="about">
      <div className="about-container">
        <h1 className="about-title">Your Digital Auto Service Partner</h1>
        <p className="about-description">
          Welcome to our modern automotive service center. We combine
          professional mechanical expertise with digital convenience, offering
          you comprehensive vehicle care through our online platform. Access
          your reports, schedule services, and communicate with our team - all
          from your device.
        </p>
        <ServicesLanding />

        <div className="cta-container">
          <a className="cta-button secondary" href="#contact">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
