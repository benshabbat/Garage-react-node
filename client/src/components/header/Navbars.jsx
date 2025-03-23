import { Link } from "react-router-dom";
import { NavAdmin, NavUser, NavLanding, Login } from "../index";
import { useHeaderContext } from "./HeaderContext";
import Logo from "../../images/logo.jpg";

export default function Navbars() {
  const { user, handleOutsideClick, isNavOpen, userAuth } = useHeaderContext();
  const nav = () => {
     userAuth && user?.isAdmin ? <NavAdmin /> : <NavUser />;
  };

  return (
    <>
      <div className="main-header">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo for garage" className="logo" />
          </Link>
        </div>

        <button
          className="mobile-nav-toggle"
          onClick={handleOutsideClick}
          aria-label="toggle navigation"
        >
          {isNavOpen ? "×" : "☰"}
        </button>

        <div className={`navbar ${isNavOpen ? "active" : ""}`}>
          {nav}
        </div>
      </div>
      <Login />
    </>
  );
}
