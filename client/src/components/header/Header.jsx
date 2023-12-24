import "./header.css";
import { Link, Outlet } from "react-router-dom";
import { MyAccount, NavAdmin, NavUser, NavLanding } from "../index";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../features/user/userSlice";
const Header = () => {
  const { user: userAuth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userAuth?._id) dispatch(getUser(userAuth?._id));
  }, [userAuth]);
  return (
    <>
      <div className="main-header">
        <div className="navbar">
          <div className="logo">
            <Link to="/">Garage770</Link>
          </div>
          <div>
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
            {(userAuth === null || userAuth === undefined )&& <NavLanding />}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
