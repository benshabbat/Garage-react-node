import { useState, useEffect } from "react";
import useOpenModel from "../hooks/useOpenModel";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/admin/adminSlice";

export function useUsers() {
  const { users } = useSelector((state) => state.admin);
  const [user, setUser] = useState();
  const [handleManageUser, isOpenManageUser] = useOpenModel();
  const [handleCreateUser, isOpenCreateUser] = useOpenModel();
  const [filterUsers, setFilterUsers] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [isOpenManageUser, isOpenCreateUser]);

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
  return {
    handleUser,
    filterSearch,
    filterUsers,
    handleCreateUser,
    user,
    users,
    isOpenCreateUser,
    handleManageUser,
    isOpenManageUser,
  };
}

export const bodyUser = (user, handleUser) => {
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
