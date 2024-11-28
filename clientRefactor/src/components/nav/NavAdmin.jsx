import { Link } from "react-router-dom";
import { MyAccount } from "../index";
import { useHeaderContext } from "../header/HeaderContext";
const NavAdmin = () => {

  const { user, handleOutsideClick,setIsNavOpen } =
  useHeaderContext()
  return (
    <>
      <Link to={`/users`} onClick={handleOutsideClick}>Users</Link>
      <Link to={`/cars`} onClick={handleOutsideClick}>Cars</Link>
      <Link to={`/services`} onClick={handleOutsideClick}>Services</Link>
      <Link to={`/messages`} onClick={handleOutsideClick}>Messages</Link>
      <Link to={`/messages-contact`} onClick={handleOutsideClick}>Messages-Contact</Link>
      <MyAccount user={user} setIsNavOpen={setIsNavOpen} />
    </>
  );
};

export default NavAdmin;