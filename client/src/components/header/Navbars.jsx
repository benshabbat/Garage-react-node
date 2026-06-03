import { Link } from "react-router-dom";
import { NavAdmin, NavUser, NavLanding, Login } from "../index";
import { useHeaderUIStore } from "../../stores/uiStores";
import { useHeaderHandlers } from "./hooks/useHeaderHandlers";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import Logo from "../../images/logo.jpg";

// Defined outside to avoid creating a new component type on every Navbars render
function Nav() {
  const userAuth = useAuthStore((s) => s.user);
  const user = useUserStore((s) => s.user);

  if (userAuth && !user) {
    return <div className="nav-loading">loading...</div>;
  }
  return user ? user.isAdmin ? <NavAdmin /> : <NavUser /> : <NavLanding />;
}

export default function Navbars() {
  const isNavOpen = useHeaderUIStore((s) => s.isNavOpen);
  const { handleOutsideClick } = useHeaderHandlers();
  return (
    <>
      <div className="main-header">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Garage770" className="logo" />
          </Link>
        </div>

        <button
          className="mobile-nav-toggle"
          onClick={handleOutsideClick}
          aria-label="toggle navigation"
          aria-expanded={isNavOpen}
          aria-controls="main-navbar"
        >
          {isNavOpen ? "×" : "☰"}
        </button>

        <div id="main-navbar" className={`navbar ${isNavOpen ? "active" : ""}`}>
          <Nav />
        </div>
      </div>
      <Login />
    </>
  );
}
