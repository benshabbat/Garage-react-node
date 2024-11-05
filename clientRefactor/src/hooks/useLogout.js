import {  useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { resetUser } from "../features/user/userSlice";
const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        dispatch(resetUser());
        navigate("/");
      };
    
  return { onLogout };
};
export default useLogout;