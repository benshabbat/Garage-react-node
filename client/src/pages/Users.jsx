import "../components/table/table.css";
import ManageUser from "../components/manage/ManageUser";
import { Register } from "../components";
import { useUsers } from "./utilsUsers";
// import MangeUsers from "./MangeUsers";
const Users = () => {
  const {
    TableUsers,
    handleCreateUser,
    user,
    users,
    isOpenCreateUser,
    handleManageUser,
    isOpenManageUser,
    filterSearch,
    Search,
    PageUsers,
  } = useUsers();
  return (
    <>
      <PageUsers/>

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
};

export default Users;
