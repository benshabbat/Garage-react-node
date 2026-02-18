import { Link } from "react-router-dom";
import { MyAccount } from "../index";
import { useHeaderContext } from "../header/HeaderContext";

//TODO:MAYBE MAP / OR COMP OF LINK INSIDE HANDLE
const NavAdmin = () => {
  const { handleOutsideClick } = useHeaderContext();
  
  return (
    <>
      <Link to={`/users`} onClick={handleOutsideClick}>
        Users
      </Link>
      <Link to={`/cars`} onClick={handleOutsideClick}>
        Cars
      </Link>
      <Link to={`/services`} onClick={handleOutsideClick}>
        Services
      </Link>
      <Link to={`/appointments`} onClick={handleOutsideClick}>
        Appointments
      </Link>
      <Link to={`/messages`} onClick={handleOutsideClick}>
        Messages
      </Link>
      <Link to={`/messages-contact`} onClick={handleOutsideClick}>
        Messages-Contact
      </Link>
      <MyAccount />
    </>
  );
};

export default NavAdmin;
