import "./header.css";
import { Link, Outlet } from "react-router-dom";
import { MyAccount, NavAdmin, NavUser, NavLanding } from "../index";
import { Suspense, useEffect } from "react";
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
            {user ? (
              user?.isAdmin ? (
                <NavAdmin user={user} />
              ) : (
                <NavUser user={user} />
              )
            ) : (
              (userAuth === null || userAuth === undefined) && <NavLanding />
            )}
          </div>
        </div>
      </div>
      <Suspense fallback={<h1>Loading..</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;
