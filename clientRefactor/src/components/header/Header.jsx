import "./header.css";
import { Link, Outlet } from "react-router-dom";
import { NavAdmin, NavUser, NavLanding } from "../index";
import { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../features/user/userSlice";
const Header = () => {
  const { user: userAuth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userAuth?._id) dispatch(getUser(userAuth?._id));
  }, [dispatch, userAuth]);

  return (
    <>
      <div className="main-header">
        <div className="logo">
          <Link to="/">Garage770</Link>
        </div>
        <div className="navbar">
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
      <Suspense fallback={<h1>Loading..</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;
