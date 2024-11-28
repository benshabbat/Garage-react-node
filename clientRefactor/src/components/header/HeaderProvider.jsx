import "./header.css";
import { HeaderContext } from "./HeaderContext";
// import { Link, Outlet } from "react-router-dom";
// import { NavAdmin, NavUser, NavLanding } from "../index";
import useOpenModel from "../../hooks/useOpenModel";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../features/user/userSlice";
export default function HeaderProvider({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user: userAuth } = useSelector((state) => state.auth);
  const [handelLogin, isOpenLogin] = useOpenModel();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userAuth?._id) dispatch(getUser(userAuth?._id));
  }, [dispatch, userAuth]);

  const handleOutsideClick = () => setIsNavOpen(!isNavOpen);


  const handleLogin = () => {
    handleOutsideClick();
    handelLogin();
  }
  const value = {
    user,
    handleOutsideClick,
    isNavOpen,
    userAuth,
    setIsNavOpen,
    handleLogin,
    isOpenLogin
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}
