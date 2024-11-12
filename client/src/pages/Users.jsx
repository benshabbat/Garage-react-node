
import { useUsers } from "./utilsUsers";
const Users = () => {
  const {PageUsers } =
    useUsers();

  return PageUsers();
};

export default Users;
