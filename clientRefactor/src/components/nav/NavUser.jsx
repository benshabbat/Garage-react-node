import { Link } from "react-router-dom";
import { MyAccount } from "../index";
import { useHeaderContext } from "../header/HeaderContext";
const NavUser = ( ) => {

  const { user, handleOutsideClick,setIsNavOpen } =
  useHeaderContext()

  return (
    <>
      <Link to={`/account`} onClick={handleOutsideClick}>Account</Link>

      <Link to={`/messages`} onClick={handleOutsideClick}>Messages</Link>

      <MyAccount user={user} setIsNavOpen={setIsNavOpen} />
    </>
  );
};

export default NavUser;
