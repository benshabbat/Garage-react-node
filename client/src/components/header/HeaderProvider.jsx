import "./header.css";
import { HeaderContext } from "./HeaderContext";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../features/user/userSlice";
import { useHeaderModals } from "./hooks/useHeaderModals";
import { useHeaderHandlers } from "./hooks/useHeaderHandlers";

export default function HeaderProvider({ children }) {
  const {
    user: userAuth,
    isError,
    message,
  } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Modals management
  const modals = useHeaderModals();

  // Header handlers
  const headerHandlers = useHeaderHandlers(modals);

  useEffect(() => {
    if (userAuth?._id && !user) {
      dispatch(getUser(userAuth._id));
    }
  }, [dispatch, userAuth, user]);

  const value = {
    user,
    handleOutsideClick: headerHandlers.handleOutsideClick,
    isNavOpen: headerHandlers.isNavOpen,
    userAuth,
    setIsNavOpen: headerHandlers.setIsNavOpen,
    handleLogin: headerHandlers.handleLogin,
    isOpenLogin: modals.login.isOpen,
    useLogin: headerHandlers.useLogin,
    isError,
    handleLogout: headerHandlers.handleLogout,
    message,
  };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}
