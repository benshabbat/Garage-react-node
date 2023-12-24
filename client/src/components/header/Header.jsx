import "./header.css";
import { Link, Outlet } from "react-router-dom";
import { MyAccount, NavAdmin, NavUser, NavLanding } from "../index";

const Header = ({ userAuth = null, user = null }) => {
  // if (userAuth && user?.isAdmin === undefined) {
  //   return "Loading..";
  // }
  return (
    <>
      <div className="main-header">
        <div className="navbar">
          <div className="logo">
            <Link to="/">Garage770</Link>
          </div>
          <div>
            {userAuth === null && <NavLanding />}
            {user?.isAdmin !== undefined && (
              <>
                {user?.isAdmin && <NavAdmin />}
                {user?.isAdmin === false && <NavUser />}
                <div className="item-nav">
                  <Link to={`/messages`}>Messages</Link>
                </div>
                <div className="item-nav dropdown">
                  <MyAccount user={user} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
