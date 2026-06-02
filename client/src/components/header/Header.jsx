import "./header.css";
import { Outlet } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Navbars from "./Navbars";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";

const Header = () => {
  const userAuth = useAuthStore((s) => s.user);
  const user = useUserStore((s) => s.user);
  const getUser = useUserStore((s) => s.getUser);

  useEffect(() => {
    if (userAuth?._id && !user) {
      getUser(userAuth._id);
    }
  }, [userAuth, user, getUser]);

  return (
    <>
      <Navbars />
      <Suspense fallback={<div className="page-loader" aria-label="Loading" />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;
