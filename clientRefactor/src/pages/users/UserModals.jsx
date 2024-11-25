import ManageUser from "../../components/manage/ManageUser";
import { Register } from "../../components";
import { useUsersContext } from "./UsersContext";

export default function UserModals() {
  const { modals, users, selectedUser } = useUsersContext();
  return (
    <>
      <Register
        users={users}
        handelClick={modals.createUser.onClose}
        isOpen={modals.createUser.isOpen}
      />
      <ManageUser
        user={selectedUser}
        handelClick={modals.manageUser.onClose}
        isOpen={modals.manageUser.isOpen}
      />
    </>
  );
}
