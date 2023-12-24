import "../components/table/table.css";
import React, { useState, useEffect } from "react";
import useOpenModel from "../hooks/useOpenModel";
import ManageUser from "../components/manage/ManageUser";
import { Register } from "../components";
import { useDispatch } from "react-redux";
import { getUsers } from "../features/admin/adminSlice";
const Users = ({ users = null }) => {
  const [user, setUser] = useState();
  const [handleManageUser, isOpenManageUser] = useOpenModel();
  const [handleCreateUser, isOpenCreateUser] = useOpenModel();
  // const [data, setData] = useState(false)
  const [filterUsers, setFilterUsers] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [isOpenManageUser]);
  const filterSearch = (e) => {
    const { value } = e.target;
    setFilterUsers(
      users.filter(
        (item) =>
          item.username.includes(value) ||
          item.email.includes(value) ||
          item.phone.includes(value)
      )
    );
  };
  const handleUser = (e) => {
    if (e.target.value) {
      console.log(e.target.value);
      setUser(users.find((user) => user._id === e.target.value));
      handleManageUser();
    }
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
  return (
    <>
      <div className="table-container">
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
            <tbody>
              {filterUsers ? filterUsers?.map(bodyUser) : users?.map(bodyUser)}
            </tbody>
          </table>
          <button onClick={handleCreateUser}>Create User</button>
        </section>
      </div>
      <Register handelClick={handleCreateUser} isOpen={isOpenCreateUser} />
      <ManageUser
        user={user}
        handelClick={handleManageUser}
        isOpen={isOpenManageUser}
      />
    </>
  );
};

export default Users;
