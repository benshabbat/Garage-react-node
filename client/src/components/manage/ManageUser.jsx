import "./manage.css";
import { CreateCar, EditUser } from "../index";
import { useUsersUIStore } from "../../stores/uiStores";
import { useUserAdminHandlers } from "../../pages/users/hooks/useUserAdminHandlers";
import ManageModal from "./ManageModal";

const MANAGE_USER_BUTTONS = [
  { name: "createCar", type: "create", content: "Create Car" },
  { name: "editUser", type: "edit", content: "Edit User" },
  { name: "deleteUser", type: "delete", content: "Delete User" },
];

const ManageUser = () => {
  const selectedUser = useUsersUIStore((s) => s.selectedUser);
  const manageUserOpen = useUsersUIStore((s) => s.manageUserOpen);
  const toggleManageUser = useUsersUIStore((s) => s.toggleManageUser);
  const { handleUser } = useUserAdminHandlers();

  return (
    <ManageModal
      buttons={MANAGE_USER_BUTTONS}
      isOpen={manageUserOpen}
      onClose={toggleManageUser}
      handleAction={handleUser}
      selectedId={selectedUser?._id}
    >
      <CreateCar />
      <EditUser />
    </ManageModal>
  );
};

export default ManageUser;
