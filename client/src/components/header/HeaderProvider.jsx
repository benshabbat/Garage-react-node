import "./header.css";
import { login } from "../../features/auth/authSlice";
import { HeaderContext } from "./HeaderContext";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../features/user/userSlice";
import useOpenModal from "../../hooks/useOpenModal";
import useLogout from "../../hooks/useLogout";

export default function HeaderProvider({ children }) {
  const { user: userAuth, isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  
  // Add loading state to track authentication status
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [onLogin, isOpenLogin] = useOpenModal();
  const { onLogout } = useLogout();
  const dispatch = useDispatch();

  // First useEffect to handle user data fetching
  useEffect(() => {
    if (userAuth?._id && !user) {
      dispatch(getUser(userAuth._id));
    }
  }, [dispatch, userAuth, user]);
  
  // Second useEffect to handle authentication loading state
  useEffect(() => {
    // We consider auth loaded when we either have userAuth or clearly know we don't
    // The Redux store should be initialized by this point
    setIsAuthLoaded(true);
  }, []);

  const handleOutsideClick = () => setIsNavOpen(!isNavOpen);

  const handleLogin = () => {
    handleOutsideClick();
    onLogin();
  };
  
  const handleLogout = () => {
    handleOutsideClick();
    onLogout();
    onLogin();
  };
  
  const useLogin = () => {
    const [formData, setFormData] = useState();
    const onSubmit = async (e) => { 
      e.preventDefault();
      try {
        await dispatch(login(formData)).unwrap(); 
        onLogin(); 
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
  
    return { setFormData, onSubmit };
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
    isAuthLoaded // Add the loading state to the context
  };
  
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}