import UsersProvider from "./UsersProvider";
import UsersTable from "./UsersTable";
import Search from "./Search";
import UserModals from "./UserModals";

//TODO: TO USE WITH TABLE AND SEARCH GENERIC
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
