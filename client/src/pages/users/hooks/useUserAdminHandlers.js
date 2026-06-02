import { useAdminStore } from "../../../stores/adminStore";
import { useUsersUIStore } from "../../../stores/uiStores";
import { useUserHandlers } from "./useUserHandlers";
import { handleUserAction } from "../utils/userHandlerUtils";

export const useUserAdminHandlers = (setFilteredUsers) => {
  const users = useAdminStore((s) => s.users);
  const { setSelectedUser, toggleManageUser, toggleEditUser, toggleCreateCar, toggleDeleteUser } =
    useUsersUIStore();
  const userHandlers = useUserHandlers(setFilteredUsers);

  const handleUser = (e) => {
    handleUserAction(e, users, setSelectedUser, {
      toggleManageUser,
      toggleEditUser,
      toggleCreateCar,
      toggleDeleteUser,
    });
  };

  return { handleUser, ...userHandlers };
};
