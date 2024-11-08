import "../components/table/table.css";
import ManageUser from "../components/manage/ManageUser";
import { Register } from "../components";
import { useUsers, bodyUserForTable } from "./utilsUsers";
const Users = () => {
  const {
    handleUser,
    filterSearch,
    filterUsers,
    handleCreateUser,
    user,
    users,
    isOpenCreateUser,
    handleManageUser,
    isOpenManageUser,
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
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>user name</th>
                <th>email</th>
                <th>phone number</th>
              </tr>
            </thead>
            <tbody>
              {bodyUserForTable(filterUsers,users,handleUser)}
            </tbody>
          </table>
        </section>
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      <Register handelClick={handleCreateUser} isOpen={isOpenCreateUser} />
      <ManageUser
        user={user}
        handelClick={handleManageUser}
        isOpen={isOpenManageUser}
      />
    </>
  );
};

export default Users;
