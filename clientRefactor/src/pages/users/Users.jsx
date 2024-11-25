import UsersProvider from "./UsersProvider";
import UsersTable from "./UsersTable";
import Search from "./Search";
import UserModals from "./UserModals";


const Users = () => {
  return (
    <UsersProvider>
      <div className="table-container">
        <Search/>
        <UsersTable />
      </div>
      <UserModals />
    </UsersProvider>
  );
};

export default Users;
