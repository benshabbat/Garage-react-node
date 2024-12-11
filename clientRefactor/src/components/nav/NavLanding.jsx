import Login from "../login/Login";
import { Link } from "react-router-dom";
import { useHeaderContext } from "../header/HeaderContext";

const NavLanding = () => {
  const { handleOutsideClick, handleLogin } = useHeaderContext();

  return (
    <>
      {/* <Link to="#top" onClick={handleOutsideClick}>
        Home
      </Link> */}
      {/* <a href="#address" onClick={handleOutsideClick}>
        Address
        </a> */}
      <a href="#about" onClick={handleOutsideClick}>
        About
      </a>
      {/* <a href="#services" onClick={handleOutsideClick}>
        Services
      </a> */}
      <a href="#contact" onClick={handleOutsideClick}>
        Contact
      </a>
      <a href="#reviews" onClick={handleOutsideClick}>
        Reviews
      </a>
      <button onClick={handleLogin}>Login</button>
      <Login />
    </>
  );
};

export default NavLanding;
