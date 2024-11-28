import "./header.css";
import { login } from "../../features/auth/authSlice";
import { HeaderContext } from "./HeaderContext";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../features/user/userSlice";
import useOpenModel from "../../hooks/useOpenModel";

export default function HeaderProvider({ children }) {
  const { user: userAuth,isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const [handelLogin, isOpenLogin] = useOpenModel();

  const dispatch = useDispatch();


  useEffect(() => {
    if (userAuth?._id) dispatch(getUser(userAuth?._id));
  }, [dispatch, userAuth]);

  const handleOutsideClick = () => setIsNavOpen(!isNavOpen);

  const handleLogin = () => {
    handleOutsideClick();
    handelLogin();
  };

  const useLogin = () => {
    const [formData, setFormData] = useState();
    const onSubmit = (e) => {
      e.preventDefault();
      dispatch(login(formData));
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
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}
