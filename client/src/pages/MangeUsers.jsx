import ManageUser from "../components/manage/ManageUser";
import { Register } from "../components";
import { useUsers } from "./utilsUsers";
function MangeUsers({
  handleCreateUser,
  isOpenCreateUser,
  handleManageUser,
  isOpenManageUser,
  user,
}) {
  const {
    users,
  } = useUsers();
  return (
    <>
      <Register
        users={users}
        handelClick={handleCreateUser}
        isOpen={isOpenCreateUser}
      />
      <ManageUser
        user={user}
        handelClick={handleManageUser}
        isOpen={isOpenManageUser}
      />
    </>
  );
}

export default MangeUsers;
