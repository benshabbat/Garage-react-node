import { resolveActionTarget } from "../../../utils/handlerUtils";

export const handleUserAction = (e, users, setSelectedUser, modals) => {
  const name = resolveActionTarget(e, users, setSelectedUser);

  switch (name) {
    case "editUser":
      modals.editUser.handle();
      break;
    case "createCar":
      modals.createCar.handle();
      break;
    case "deleteUser":
      modals.deleteUser.handle();
      break;
    default:
      modals.manageUser.handle();
  }
};
