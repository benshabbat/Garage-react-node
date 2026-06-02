import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { resetAdmin } from "../features/admin/adminSlice";
import { resetUser } from "../features/user/userSlice";

const useLogout = () => {
  const authLogout = useAuthStore((s) => s.logout);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    await authLogout();
    dispatch(resetUser());
    dispatch(resetAdmin());
    navigate("/");
  };

  return { onLogout };
};

export default useLogout;
