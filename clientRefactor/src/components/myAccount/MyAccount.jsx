import "./myAccount.css";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const MyAccount = ({ setIsNavOpen, user }) => {
  const handleClick = () => {
    setIsNavOpen(false); 
  };
  const handleLogout = () => {
    handleClick();
    onLogout();
  };
  const { onLogout } = useLogout();
  return (
    <div className="dropdown">
      <button className="dropbtn">My Account</button>
      <div className="dropdown-content">
        <Link to={`/account`} onClick={handleClick}>
          {user?.username}
        </Link>
        <button onClick={handleLogout}>LogOut</button>
      </div>
    </div>
  );
};

export default MyAccount;
