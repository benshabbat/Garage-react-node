import useLogout from "../../../hooks/useLogout";
import { useHeaderUIStore } from "../../../stores/uiStores";

export const useHeaderNav = () => {
  const isNavOpen = useHeaderUIStore((s) => s.isNavOpen);
  const toggleNav = useHeaderUIStore((s) => s.toggleNav);
  const toggleLogin = useHeaderUIStore((s) => s.toggleLogin);
  const { onLogout } = useLogout();

  const handleOutsideClick = () => toggleNav();
  const handleLogin = () => { toggleNav(); toggleLogin(); };
  const handleLogout = () => { toggleNav(); onLogout(); };

  return { isNavOpen, handleOutsideClick, handleLogin, handleLogout };
};
