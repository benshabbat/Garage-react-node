import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { useAdminStore } from "../stores/adminStore";
import { useAppointmentsStore } from "../stores/appointmentsStore";

const useLogout = () => {
  const authLogout = useAuthStore((s) => s.logout);
  const resetUser = useUserStore((s) => s.resetUser);
  const resetAdmin = useAdminStore((s) => s.resetAdmin);
  const resetAppointments = useAppointmentsStore((s) => s.resetAppointments);
  const navigate = useNavigate();

  const onLogout = async () => {
    await authLogout();
    resetUser();
    resetAdmin();
    resetAppointments();
    navigate("/");
  };

  return { onLogout };
};

export default useLogout;
