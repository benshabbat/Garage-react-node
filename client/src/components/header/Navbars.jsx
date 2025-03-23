import { Link } from "react-router-dom";
import { NavAdmin, NavUser, NavLanding, Login } from "../index";
import { useHeaderContext } from "./HeaderContext";
import Logo from "../../images/logo.jpg";

export default function Navbars() {
  const { user, handleOutsideClick, isNavOpen, userAuth, isAuthLoaded } = useHeaderContext();
  
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
          {!isAuthLoaded ? (
            // Show loading indicator or nothing while auth is being determined
            <div className="loading-nav"></div>
          ) : userAuth && user ? (
            // User is authenticated, show proper nav based on role
            user.isAdmin ? (
              <NavAdmin />
            ) : (
              <NavUser />
            )
          ) : (
            // User is definitely not authenticated
            <NavLanding />
          )}
        </div>
      </div>
      <Login />
    </>
  );
}