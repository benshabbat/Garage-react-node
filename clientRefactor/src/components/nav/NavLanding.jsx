import Login from "../login/Login";
import useOpenModel from "../../hooks/useOpenModel";
import { Link } from "react-router-dom";

const NavLanding = ({ setIsNavOpen }) => {
  const [handelLogin, isOpenLogin] = useOpenModel();
  
  const handleClick = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      <Link to="#home" onClick={handleClick}>Home</Link>
      <a href="#reviews" onClick={handleClick}>Reviews</a>
      <a href="#address" onClick={handleClick}>Address</a>
      <a href="#about" onClick={handleClick}>About</a>
      <a href="#services" onClick={handleClick}>Services</a>
      <a href="#contact" onClick={handleClick}>Contact</a>
      <button onClick={() => {
        handleClick();
        handelLogin();
      }}>Login</button>
      <Login handelClick={handelLogin} isOpen={isOpenLogin} />
    </>
  );
};

export default NavLanding;