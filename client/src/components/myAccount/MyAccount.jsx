import "./myAccount.css";
import { Link } from "react-router-dom";

import { useHeaderContext } from "../header/HeaderContext";

const MyAccount = () => {
  const { user, handleLogout, handleOutsideClick } = useHeaderContext();

  return (
    <div className="dropdown">
      <button>My Account</button>
      <div className="dropdown-content">
        <Link to={`/myCars`} onClick={handleOutsideClick}>
          {user?.username}
        </Link>
        <button onClick={handleLogout}>LogOut</button>
      </div>
    </div>
  );
};

export default MyAccount;
