import "./header.css";
import { HeaderContext } from "./HeaderContext";
import { useEffect } from "react";
import { useHeaderModals } from "./hooks/useHeaderModals";
import { useHeaderHandlers } from "./hooks/useHeaderHandlers";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";

export default function HeaderProvider({ children }) {
  const userAuth = useAuthStore((s) => s.user);
  const isError = useAuthStore((s) => s.isError);
  const message = useAuthStore((s) => s.message);
  const user = useUserStore((s) => s.user);
  const getUser = useUserStore((s) => s.getUser);

  const modals = useHeaderModals();
  const headerHandlers = useHeaderHandlers(modals);

  useEffect(() => {
    if (userAuth?._id && !user) {
      getUser(userAuth._id);
    }
  }, [userAuth, user, getUser]);

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
