import { Link } from "react-router-dom";
import { MyAccount } from "../index";
const NavUser = (props ) => {
  const { setIsNavOpen,user } = props; 

  const handleClick = () => {
    setIsNavOpen(false); // סוגר את התפריט אחרי בחירה
  };
  return (
    <>
      <Link to={`/account`} onClick={handleClick}>Account</Link>

      <Link to={`/messages`} onClick={handleClick}>Messages</Link>

      <MyAccount user={user} setIsNavOpen={setIsNavOpen} />
    </>
  );
};

export default NavUser;
