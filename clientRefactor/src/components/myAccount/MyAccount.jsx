import "./myAccount.css";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const MyAccount = (props ) => {
  const { setIsNavOpen,user } = props; 

  const handleClick = () => {
    setIsNavOpen(false); // סוגר את התפריט אחרי בחירה
  };
  const { onLogout } = useLogout();
  return (
    <div className="dropdown">
      {" "}
      {/* שינינו ל-dropdown */}
      <button className="dropbtn">My Account</button>
      <div className="dropdown-content">
        <Link to={`/account`} onClick={handleClick}>{user?.username}</Link>
        <button onClick={onLogout}>LogOut</button>
      </div>
    </div>
  );
};

export default MyAccount;
