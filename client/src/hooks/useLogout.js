import {  useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { resetAdmin } from "../features/admin/adminSlice";
import { resetUser } from "../features/user/userSlice";
const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        dispatch(resetUser());
        dispatch(resetAdmin());
        navigate("/");
      };
    
  return { onLogout };
};
export default useLogout;