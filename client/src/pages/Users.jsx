import "../components/table/table.css";
import ManageUser from "../components/manage/ManageUser";
import { Register } from "../components";
import { useUsers } from "./utilsUsers";
// import MangeUsers from "./MangeUsers";


//TODO: TO MAKE CUSTOM COMPONENTS AND TO MOVE THEM TO UTILS ACCOUNT

//WHY I CANT TO CREATE COMPONENT OF SEARCH WHY DOSENT WORK!
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
    Search,PageUsers
  } = useUsers();
  return (
    <>
      <div className="table-container">
        <section className="table__header">
          <h1>Users</h1>
          <div className="input-group">
            <input
              type="search"
              placeholder="Search Data..."
              onChange={filterSearch}
            />
          </div>
        </section>
        <TableUsers />
      </div>

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
