import { useState } from "react";
import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useUsersContext } from "./UsersContext";
export default function UsersTable() {
  const { handleUser, displayUsers, handleSearch, modals ,handleSort} = useUsersContext();
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
    const handleSortHeader = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
      handleSort(key, direction);
    };
  
  
  
  
  
  
  const trTh = (
    <tr>
      <th>Actions</th>
      <th onClick={() => handleSortHeader('username')}>User Name</th>
      <th onClick={() => handleSortHeader('email')}>Email</th>
      <th onClick={() => handleSortHeader('phone')}>Phone Number</th>
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
