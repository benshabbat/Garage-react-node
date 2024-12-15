import UsersProvider from "./UsersProvider";
import UsersTable from "./UsersTable";
import UserModals from "./UserModals";

const Users = () => {
  return (
    <UsersProvider>
      <UsersTable />
      <UserModals />
    </UsersProvider>
  );
};

export default Users;
