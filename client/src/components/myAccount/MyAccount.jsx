import "./myAccount.css";
import { Link } from "react-router-dom";

import { useUserStore } from "../../stores/userStore";
import { useHeaderHandlers } from "../header/hooks/useHeaderHandlers";

const MyAccount = () => {
  const user = useUserStore((s) => s.user);
  const { handleLogout, handleOutsideClick } = useHeaderHandlers();

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
