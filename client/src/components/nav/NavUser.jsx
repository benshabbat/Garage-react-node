import { Link } from "react-router-dom";
import { MyAccount } from "../index";
import { useHeaderContext } from "../header/HeaderContext";

//TODO:MAYBE MAP / OR COMP OF LINK INSIDE HANDLE
const NavUser = () => {
  const { handleOutsideClick } = useHeaderContext();

  return (
    <>
      <Link to={`/myCars`} onClick={handleOutsideClick}>
        MyCars
      </Link>

      <Link to={`/appointments`} onClick={handleOutsideClick}>
        Appointments
      </Link>

      <Link to={`/messages`} onClick={handleOutsideClick}>
        Messages
      </Link>

      <MyAccount />
    </>
  );
};

export default NavUser;
