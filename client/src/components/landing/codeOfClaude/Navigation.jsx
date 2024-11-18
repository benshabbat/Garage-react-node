import "./navigation.css"
import { Link } from "react-router-dom";
export const Navigation = () => {
    return (
      <nav className="navigation">
        <div className="container nav-container">
          <Link to="/" className="logo">
             AutoService
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>
    );
  };