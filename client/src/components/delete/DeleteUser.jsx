import DeleteModal from "./DeleteModal";
import { useUsersUIStore } from "../../stores/uiStores";
import { useUserHandlers } from "../../pages/users/hooks/useUserHandlers";

const DeleteUser = () => (
  <DeleteModal
    useStore={useUsersUIStore}
    selectedKey="selectedUser"
    isOpenKey="deleteUserOpen"
    toggleKey="toggleDeleteUser"
    useHandlers={useUserHandlers}
    handlerKey="useDeleteUser"
    displayField="username"
    nameData="deleteUser"
  />
);

export default DeleteUser;
