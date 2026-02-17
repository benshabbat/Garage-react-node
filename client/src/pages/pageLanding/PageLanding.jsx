import "./pageLanding.css";
import { Reviews, About} from "../../components";
import NewContact from "../../components/landing/contact/NewContact.jsx";

const PageLanding = () => {
  return (
    <div className="main">
      <About />
      <NewContact/>
      <Reviews />
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Garage 770</h3>
            <p>Your trusted digital auto service partner.</p>
            <p>Professional mechanical expertise combined with modern digital convenience.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
            <a href="#reviews">Reviews</a>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>Phone: (555) 770-AUTO</p>
            <p>Email: info@garage770.com</p>
            <p>Hours: Mon-Fri 8AM-6PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Garage 770. Written By <a href="https://github.com/benshabbat" target="_blank" rel="noopener noreferrer">David-Chen Benshabbat</a></p>
        </div>
      </footer>
    </div>
  );
};

export default PageLanding;
