import "../components/table/table.css";
import { useState, useEffect } from "react";
import useOpenModel from "../hooks/useOpenModel";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/admin/adminSlice";

import ManageUser from "../components/manage/ManageUser";
import { Register } from "../components";
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

  //working as Search()
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
      </section>
    );
  }

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

  const TableUsers = () => {
    const bodyUserForTable = filterUsers
      ? filterUsers?.map(bodyUser)
      : users?.map(bodyUser);
    return (
      <>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>user name</th>
                <th>email</th>
                <th>phone number</th>
              </tr>
            </thead>
            <tbody>{bodyUserForTable}</tbody>
          </table>
        </section>
        <button onClick={handleCreateUser}>Create User</button>
      </>
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
