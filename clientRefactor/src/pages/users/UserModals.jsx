import ManageUser from "../../components/manage/ManageUser";
import { Register } from "../../components";
import { useUsersContext } from "./UsersContext";

export default function UserModals() {
  const { modals } = useUsersContext();
  return (
    <>
      <Register
        handelClick={modals.createUser.onClose}
        isOpen={modals.createUser.isOpen}
      />
      <ManageUser
        handelClick={modals.manageUser.onClose}
        isOpen={modals.manageUser.isOpen}
      />
    </>
  );
}
