import { useUsersTableData } from "./useUsersTableData";

const COLUMNS = [
  { key: "username", label: "User Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone Number" },
];

export function useUsersTableRows() {
  const {
    displayUsers,
    handleSearch,
    handleUser,
    handleSortHeader,
    toggleCreateUser,
    handleExport,
  } = useUsersTableData();

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

  return { trTh, trTd, handleSearch, toggleCreateUser, handleExport };
}
