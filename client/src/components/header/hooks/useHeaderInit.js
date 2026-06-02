import { useEffect } from "react";
import { useAuthStore } from "../../../stores/authStore";
import { useUserStore } from "../../../stores/userStore";

export function useHeaderInit() {
  const userAuth = useAuthStore((s) => s.user);
  const user = useUserStore((s) => s.user);
  const getUser = useUserStore((s) => s.getUser);

  useEffect(() => {
    if (userAuth?._id && !user) {
      getUser(userAuth._id);
    }
  }, [userAuth, user, getUser]);
}
