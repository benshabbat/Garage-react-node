import "./header.css";
import { Link, Outlet } from "react-router-dom";
import { MyAccount, NavAdmin, NavUser, NavLanding } from "../index";

import { useSelector, useDispatch } from "react-redux";

const Header = ({ userAuth = null, user = null }) => {
  const { user: userAuth } = useSelector((state) => state.auth);
  const { messages, user } = useSelector((state) => state.user);
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
