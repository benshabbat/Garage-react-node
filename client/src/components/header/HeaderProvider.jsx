import "./header.css";
import { login } from "../../features/auth/authSlice";
import { HeaderContext } from "./HeaderContext";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../features/user/userSlice";
import useOpenModal from "../../hooks/useOpenModal";
import useLogout from "../../hooks/useLogout";
export default function HeaderProvider({ children }) {
  const { user: userAuth,isError,message } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const [onLogin, isOpenLogin] = useOpenModal();

  const { onLogout } = useLogout();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userAuth?._id && !user) {
      dispatch(getUser(userAuth._id));
    }
  }, [dispatch, userAuth, user]);

  const handleOutsideClick = () => setIsNavOpen(!isNavOpen);

  const handleLogin = () => {
    handleOutsideClick();
    onLogin();
  };
  
  
  const handleLogout = () => {
    handleOutsideClick();
    onLogout();
    // onLogin();
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
    handleLogout,message
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}
