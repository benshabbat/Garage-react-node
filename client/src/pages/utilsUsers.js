import { useState, useEffect } from "react";
import useOpenModel from "../hooks/useOpenModel";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/admin/adminSlice";

import ManageUser from "../components/manage/ManageUser";
import { Register } from "../components";
export function useUsers() {
  const { users } = useSelector((state) => state.admin);
  const [user, setUser] = useState();
  const [searchVal, setSearchVal] = useState("")
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
    setSearchVal(value)
    setFilterUsers(
      users?.filter(
        (item) =>
          item.username.includes(value) ||
          item.email.includes(value) ||
          item.phone.includes(value)
      )
    );
  };

  //dosent work
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

  //dosent work
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
   //dosent work
  const PageUsers = () => {
    return (
      <div className="table-container">
        <section className="table__header">
          <h1>Users</h1>
          <div className="input-group">
            <input
              type="search"
              placeholder="Search Data..."
              onChange={filterSearch}
              value={searchVal}
            />
          </div>
        </section>
        <TableUsers />
      </div>
    );
  };


  
  return {
    PageUsers,
    Search,
    TableUsers,
    MangeUsers,
    filterSearch,
    handleCreateUser,
    user,
    users,
    isOpenCreateUser,
    handleManageUser,
    isOpenManageUser,
  };
}
