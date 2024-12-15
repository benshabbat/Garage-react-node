import { Link } from "react-router-dom";
import { MyAccount } from "../index";
import { useHeaderContext } from "../header/HeaderContext";
const NavUser = () => {
  const { handleOutsideClick } = useHeaderContext();

  return (
    <>
      <Link to={`/myCars`} onClick={handleOutsideClick}>
        MyCars
      </Link>

      <Link to={`/messages`} onClick={handleOutsideClick}>
        Messages
      </Link>

      <MyAccount />
    </>
  );
};

export default NavUser;
