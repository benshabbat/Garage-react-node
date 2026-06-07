import { resolveActionTarget } from "../../../utils/handlerUtils";

export const handleUserAction = (
  e,
  users,
  setSelectedUser,
  { toggleManageUser, toggleEditUser, toggleCreateCar, toggleDeleteUser }
) => {
  const name = resolveActionTarget(e, users, setSelectedUser);
  switch (name) {
    case "editUser":
      toggleEditUser();
      break;
    case "createCar":
      toggleCreateCar();
      break;
    case "deleteUser":
      toggleDeleteUser();
      break;
    default:
      toggleManageUser();
  }
};
