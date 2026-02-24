import "./header.css";
import { HeaderContext } from "./HeaderContext";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../features/user/userSlice";
import useOpenModal from "../../hooks/useOpenModal";
import { useHeaderNav } from "./hooks/useHeaderNav";
import { useLoginForm } from "./hooks/useLoginForm";
export default function HeaderProvider({ children }) {
  const {
    user: userAuth,
    isError,
    message,
  } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const [onLogin, isOpenLogin] = useOpenModal();
  
  // Navigation state management
  const {
    isNavOpen,
    setIsNavOpen,
    handleOutsideClick,
    handleLogin,
    handleLogout,
  } = useHeaderNav(onLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userAuth?._id && !user) {
      dispatch(getUser(userAuth._id));
    }
  }, [dispatch, userAuth, user]);

  // Hook for login form
  const useLogin = () => {
    return useLoginForm(onLogin);
  };

  const value = {
    user,
    handleOutsideClick,
    isNavOpen,
    userAuth,
    setIsNavOpen,
    handleLogin,
    isOpenLogin,
    useLogin,
    isError,
    handleLogout,
    message,
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}
