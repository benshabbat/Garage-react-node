import "./header.css";
import { Link, Outlet } from "react-router-dom";
import { NavAdmin, NavUser, NavLanding } from "../index";
import { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../features/user/userSlice";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user: userAuth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userAuth?._id) dispatch(getUser(userAuth?._id));
  }, [dispatch, userAuth]);

  useEffect(() => {
    const closeNav = (e) => {
      if (isNavOpen && !e.target.closest('.navbar') && !e.target.closest('.mobile-nav-toggle')) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('click', closeNav);
    return () => document.removeEventListener('click', closeNav);
  }, [isNavOpen]);

  return (
    <>
      <div className="main-header">
        <div className="logo">
          <Link to="/">Garage770</Link>
        </div>
        
        <button 
          className="mobile-nav-toggle" 
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="toggle navigation"
        >
          {isNavOpen ? '×' : '☰'}
        </button>

        <div className={`navbar ${isNavOpen ? 'active' : ''}`}>
          {user ? (
            user?.isAdmin ? (
              <NavAdmin user={user} setIsNavOpen={setIsNavOpen} />
            ) : (
              <NavUser user={user} setIsNavOpen={setIsNavOpen} />
            )
          ) : (
            (userAuth === null || userAuth === undefined) && <NavLanding setIsNavOpen={setIsNavOpen} />
          )}
        </div>
      </div>
      <Suspense fallback={<h1>Loading..</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;