import { Link } from "react-router-dom";
import { MyAccount } from "../index";
import { useHeaderContext } from "../header/HeaderContext";
const NavUser = () => {
  const { handleOutsideClick } = useHeaderContext();

  return (
    <>
      <Link to={`/account`} onClick={handleOutsideClick}>
        Account
      </Link>

      <Link to={`/messages`} onClick={handleOutsideClick}>
        Messages
      </Link>

      <MyAccount />
    </>
  );
};

export default NavUser;
