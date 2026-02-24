import { useLoginForm } from "./useLoginForm";
import { useHeaderNav } from "./useHeaderNav";

/**
 * Custom hook for header action handlers
 * @param {Object} modals - Modal handlers
 * @returns {Object} Handler functions for header operations
 */
export const useHeaderHandlers = (modals) => {
  // Navigation state management
  const headerNav = useHeaderNav(modals.login.handle);

  /**
   * Hook for login form
   */
  const useLogin = () => {
    return useLoginForm(modals.login.handle);
  };

  return {
    useLogin,
    isNavOpen: headerNav.isNavOpen,
    setIsNavOpen: headerNav.setIsNavOpen,
    handleOutsideClick: headerNav.handleOutsideClick,
    handleLogin: headerNav.handleLogin,
    handleLogout: headerNav.handleLogout,
  };
};
