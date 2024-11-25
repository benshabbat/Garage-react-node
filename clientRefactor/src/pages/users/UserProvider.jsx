import "../../components/table/table.css";
import { useState, useEffect } from "react";
import useOpenModel from "../../hooks/useOpenModel";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/admin/adminSlice";

import ManageUser from "../../components/manage/ManageUser";
import { Register } from "../../components";
export function useUsers() {
  const { users } = useSelector((state) => state.admin);
  const [user, setUser] = useState();
  const [filterUsers, setFilterUsers] = useState();
  const [handleManageUser, isOpenManageUser] = useOpenModel();
  const [handleCreateUser, isOpenCreateUser] = useOpenModel();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [isOpenManageUser, isOpenCreateUser]);

  const handleUser = (e) => {
    if (e.target.value) {
      console.log(e.target.value);

      setUser(users.find((user) => user._id === e.target.value));
      handleManageUser();
    }
  };

  const filterSearch = (e) => {
    const { value } = e.target;
    setFilterUsers(
      users?.filter(
        (item) =>
          item.username.includes(value) ||
          item.email.includes(value) ||
          item.phone.includes(value)
      )
    );
  };

  function Search() {
    return (
      <section className="table__header">
        <h1>Users</h1>
        <div className="input-group">
          <input
            type="search"
            placeholder="Search Data..."
            onChange={filterSearch}
          />
        </div>
        <button onClick={handleCreateUser} className="create-button">
          Create User
        </button>
      </section>
    );
  }
  
  const TableUsers = () => {
    return (
      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th>Actions</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {(filterUsers ? filterUsers : users)?.map((user) => (
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
            ))}
          </tbody>
        </table>
      </section>
    );
  };

  const bodyUser = (user) => {
    return (
      <tr key={user?._id}>
        <td>
          <button value={user?._id} onClick={handleUser}>
            Manage
          </button>
        </td>
        <td>{user?.username}</td>
        <td>{user?.email}</td>
        <td>{user?.phone}</td>
      </tr>
    );
  };

 

  function MangeUsers() {
    return (
      <>
        <Register
          users={users}
          handelClick={handleCreateUser}
          isOpen={isOpenCreateUser}
        />
        <ManageUser
          user={user}
          handelClick={handleManageUser}
          isOpen={isOpenManageUser}
        />
      </>
    );
  }
  //working as PageUsers()
  const PageUsers = () => {
    return (
      <>
        <div className="table-container">
          {Search()}
          <TableUsers />
        </div>
        <MangeUsers />
      </>
    );
  };

  return {
    PageUsers,
  };
}
