import { useLoginForm } from "./useLoginForm";
import { useHeaderNav } from "./useHeaderNav";
import { useHeaderUIStore } from "../../../stores/uiStores";

export const useHeaderHandlers = () => {
  const headerNav = useHeaderNav();
  const toggleLogin = useHeaderUIStore((s) => s.toggleLogin);

  const useLogin = () => useLoginForm(toggleLogin);

  return {
    useLogin,
    isNavOpen: headerNav.isNavOpen,
    handleOutsideClick: headerNav.handleOutsideClick,
    handleLogin: headerNav.handleLogin,
    handleLogout: headerNav.handleLogout,
  };
};
