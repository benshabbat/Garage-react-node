import { useState, useEffect } from "react";
import useOpenModel from "../hooks/useOpenModel";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/admin/adminSlice";

export function useUsers() {
  const { users } = useSelector((state) => state.admin);
  const [user, setUser] = useState();
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


  
  return {
    handleUser,
    handleCreateUser,
    user,
    users,
    isOpenCreateUser,
    handleManageUser,
    isOpenManageUser,
  };
}

const bodyUser = (user, handleUser) => {
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


export function useFilterUsers(users, handleUser) {
  const [filterUsers, setFilterUsers] = useState();

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
  const bodyUserForTable = () => filterUsers
    ? filterUsers?.map((user) => bodyUser(user, handleUser))
    : users?.map((user) => bodyUser(user, handleUser));

  return { filterSearch, bodyUserForTable };
}
