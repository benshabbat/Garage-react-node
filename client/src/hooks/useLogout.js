import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { useAdminStore } from "../stores/adminStore";

const useLogout = () => {
  const authLogout = useAuthStore((s) => s.logout);
  const resetUser = useUserStore((s) => s.resetUser);
  const resetAdmin = useAdminStore((s) => s.resetAdmin);
  const navigate = useNavigate();

  const onLogout = async () => {
    await authLogout();
    resetUser();
    resetAdmin();
    navigate("/");
  };

  return { onLogout };
};

export default useLogout;
