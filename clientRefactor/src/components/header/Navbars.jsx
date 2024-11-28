import { Link } from "react-router-dom";
import { NavAdmin, NavUser, NavLanding } from "../index";
import { useHeaderContext } from "./HeaderContext";

export default function Navbars() {
  const { user, handleOutsideClick, isNavOpen, userAuth, setIsNavOpen } =
    useHeaderContext();
  return (
    <div className="main-header">
      <div className="logo">
        <Link to="/">Garage770</Link>
      </div>

      <button
        className="mobile-nav-toggle"
        onClick={handleOutsideClick}
        aria-label="toggle navigation"
      >
        {isNavOpen ? "×" : "☰"}
      </button>

      <div className={`navbar ${isNavOpen ? "active" : ""}`}>
        {user ? (
          user?.isAdmin ? (
            <NavAdmin />
          ) : (
            <NavUser />
          )
        ) : (
          !userAuth && <NavLanding setIsNavOpen={setIsNavOpen} />
        )}
      </div>
    </div>
  );
}
