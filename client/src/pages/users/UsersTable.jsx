import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useUsersTableData } from "./hooks/useUsersTableData";

export default function UsersTable() {
  const {
    displayUsers,
    handleSearch,
    handleUser,
    handleSortHeader,
    toggleCreateUser,
    handleExport,
  } = useUsersTableData();

  const COLUMNS = [
    { key: "username", label: "User Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
  ];

  const trTh = (
    <tr>
      <th>Actions</th>
      {COLUMNS.map(({ key, label }) => (
        <th key={key} onClick={() => handleSortHeader(key)}>
          {label}
        </th>
      ))}
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
      <Search handleSearch={handleSearch} name={"Users"} onExport={handleExport} />
      <Table trTh={trTh} trTd={trTd} />
      <button onClick={toggleCreateUser} className="create-button">
        Create User
      </button>
    </div>
  );
}
