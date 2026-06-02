import Delete from "./Delete";
import { useUsersUIStore } from "../../stores/uiStores";
import { useUserHandlers } from "../../pages/users/hooks/useUserHandlers";

const DeleteUser = () => {
  const selectedUser = useUsersUIStore((s) => s.selectedUser);
  const deleteUserOpen = useUsersUIStore((s) => s.deleteUserOpen);
  const toggleDeleteUser = useUsersUIStore((s) => s.toggleDeleteUser);
  const { useDeleteUser } = useUserHandlers();
  return (
    <Delete
      deleteData={selectedUser?.username}
      handle={toggleDeleteUser}
      nameData="deleteUser"
      isOpen={deleteUserOpen}
      handleDelete={useDeleteUser}
    />
  );
};

export default DeleteUser;
