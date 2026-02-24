import { useState } from "react";
import useLogout from "../../../hooks/useLogout";

/**
 * Custom hook for managing header navigation state
 * @param {Function} onLogin - Login modal handler
 * @returns {Object} Navigation state and handlers
 */
export const useHeaderNav = (onLogin) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { onLogout } = useLogout();

  const handleOutsideClick = () => setIsNavOpen(!isNavOpen);

  const handleLogin = () => {
    handleOutsideClick();
    onLogin();
  };

  const handleLogout = () => {
    handleOutsideClick();
    onLogout();
  };

  return {
    isNavOpen,
    setIsNavOpen,
    handleOutsideClick,
    handleLogin,
    handleLogout,
  };
};
