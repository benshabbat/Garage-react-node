import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useUsersContext } from "./UsersContext";
export default function UsersTable() {
  const { handleUser, displayUsers, handleSearch, modals } =
    useUsersContext();
  const trTh = (
    <tr>
      <th>Actions</th>
      <th>User Name</th>
      <th>Email</th>
      <th>Phone Number</th>
    </tr>
  );
  const trTd = displayUsers?.map((user) => (
    <tr key={user?._id}>
      <td data-label="Actions">
        <button value={user?._id} onClick={handleUser}>
          Manage
        </button>
      </td>
      <td data-label="User Name">{user?.username}</td>
      <td data-label="Email">{user?.email}</td>
      <td data-label="Phone Number">{user?.phone}</td>
    </tr>
  ));
  return (
    <div className="table-container">
      <Search handleSearch={handleSearch} name={"Users"} />
      <Table trTh={trTh} trTd={trTd} />
      <button onClick={modals.createUser.handle} className="create-button">
        Create User
      </button>
    </div>
  );
}
