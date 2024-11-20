import { Link } from "react-router-dom";
import { MyAccount } from "../index";
const NavAdmin = ({ setIsNavOpen,user }  ) => {
  const handleClick = () => {
    setIsNavOpen(false); // סוגר את התפריט אחרי בחירה
  };

  return (
    <>
      <Link to={`/users`} onClick={handleClick}>Users</Link>
      <Link to={`/cars`} onClick={handleClick}>Cars</Link>
      <Link to={`/services`} onClick={handleClick}>Services</Link>
      <Link to={`/messages`} onClick={handleClick}>Messages</Link>
      <Link to={`/messages-contact`} onClick={handleClick}>Messages-Contact</Link>
      <MyAccount user={user} setIsNavOpen={setIsNavOpen} />
    </>
  );
};

export default NavAdmin;