import { useUsersContext } from "../../pages/users/UsersContext";
import Delete from "./Delete";

const DeleteUser= () => {
  const { useDeleteUser, modals, selectedUser } = useUsersContext()
  return (
    <Delete
      deleteData={selectedUser?.username}
      handle={modals.deleteUser.handle}
      nameData="deleteUser"
      isOpen={modals.deleteUser.isOpen}
      handleDelete={useDeleteUser}
    />
  );
};

export default DeleteUser;
