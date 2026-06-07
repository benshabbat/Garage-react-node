import "./myAccount.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useUserStore } from "../../stores/userStore";
import { useHeaderHandlers } from "../header/hooks/useHeaderHandlers";

const MyAccount = () => {
  const user = useUserStore((s) => s.user);
  const { handleLogout, handleOutsideClick } = useHeaderHandlers();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <div
      className={`dropdown${open ? " is-open" : ""}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) close();
      }}
    >
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {user?.username || "My Account"}
      </button>
      <div className="dropdown-content">
        <Link to="/myCars" onClick={() => { handleOutsideClick(); close(); }}>
          {user?.username}
        </Link>
        <button onClick={() => { handleLogout(); close(); }}>LogOut</button>
      </div>
    </div>
  );
};

export default MyAccount;
