import { createActionHandler } from "../../../utils/handlerUtils";

export const handleUserAction = createActionHandler(
  { editUser: "toggleEditUser", createCar: "toggleCreateCar", deleteUser: "toggleDeleteUser" },
  "toggleManageUser"
);
