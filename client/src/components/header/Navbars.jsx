import { Link } from "react-router-dom";
import { memo } from "react";
import { NavAdmin, NavUser, NavLanding, Login } from "../index";
import { useHeaderContext } from "./HeaderContext";
import Logo from "../../images/logo.jpg";

// Memoized navigation components to prevent unnecessary re-renders
const MemoizedNavAdmin = memo(NavAdmin);
const MemoizedNavUser = memo(NavUser);
const MemoizedNavLanding = memo(NavLanding);

export default function Navbars() {
  const { user, handleOutsideClick, isNavOpen, userAuth, closeNav } = useHeaderContext();
  
  // Handler for keyboard accessibility
  const handleKeyDown = (event) => {
    if (event.key === "Escape" && isNavOpen) {
      closeNav();
    }
  };

  return (
    <>
      <header className="main-header">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Garage logo" className="logo" />
          </Link>
        </div>

        <button
          className="mobile-nav-toggle"
          onClick={handleOutsideClick}
          aria-controls="primary-navigation"
          aria-expanded={isNavOpen}
          aria-label={isNavOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{isNavOpen ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true">{isNavOpen ? "×" : "☰"}</span>
        </button>

        <nav 
          className={`navbar ${isNavOpen ? "active" : ""}`}
          id="primary-navigation"
          aria-label="Primary"
          onKeyDown={handleKeyDown}
        >
          {userAuth && user ? (
            user.isAdmin ? (
              <MemoizedNavAdmin />
            ) : (
              <MemoizedNavUser />
            )
          ) : (
            <MemoizedNavLanding />
          )}
        </nav>
      </header>
      <Login />
    </>
  );
}