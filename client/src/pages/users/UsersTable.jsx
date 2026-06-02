import { useState, useEffect, useCallback } from "react";
import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useAdminStore } from "../../stores/adminStore";
import { useUsersUIStore } from "../../stores/uiStores";
import { useUserAdminHandlers } from "./hooks/useUserAdminHandlers";
import useFilteredData from "../../hooks/useFilteredData";
import { userFilterFn } from "./utils/userValidation";

export default function UsersTable() {
  const users = useAdminStore((s) => s.users);
  const getUsers = useAdminStore((s) => s.getUsers);
  const { manageUserOpen, editUserOpen, deleteUserOpen, createUserOpen, toggleCreateUser } = useUsersUIStore();

  const memoizedUserFilterFn = useCallback(userFilterFn, []);
  const { displayData: displayUsers, handleSearch, setFilteredData: setFilteredUsers, handleSort } =
    useFilteredData(users, memoizedUserFilterFn);

  const { handleUser } = useUserAdminHandlers(setFilteredUsers);

  useEffect(() => {
    getUsers();
  }, [manageUserOpen, editUserOpen, deleteUserOpen, createUserOpen, getUsers]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
    const handleSortHeader = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
      handleSort(key, direction);
    };
  
  
  const COLUMNS = [
    { key: 'username', label: 'User Name' },
    { key: 'email',    label: 'Email' },
    { key: 'phone',    label: 'Phone Number' },
  ];

  const trTh = (
    <tr>
      <th>Actions</th>
      {COLUMNS.map(({ key, label }) => (
        <th key={key} onClick={() => handleSortHeader(key)}>{label}</th>
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
      <Search handleSearch={handleSearch} name={"Users"} />
      <Table trTh={trTh} trTd={trTd} />
      <button onClick={toggleCreateUser} className="create-button">
        Create User
      </button>
    </div>
  );
}
