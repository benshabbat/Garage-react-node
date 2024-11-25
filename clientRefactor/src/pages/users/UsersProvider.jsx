import "../../components/table/table.css";
import { UsersContext } from "./UsersContext";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/admin/adminSlice";
import useOpenModel from "../../hooks/useOpenModel";
//TODO:WHEN 
export default function UsersProvider({ children }) {
  const { users } = useSelector((state) => state.admin);

  const [selectedUser, setSelctedUser] = useState();
  const [filteredUsers, setFilteredUsers] = useState();

  const [handleManageUser, isOpenManageUser] = useOpenModel();
  const [handleCreateUser, isOpenCreateUser] = useOpenModel();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [isOpenManageUser, isOpenCreateUser, dispatch]);

  const handleUser = (e) => {
    const { value } = e.target;
    setSelctedUser(users.find((user) => user._id === value));
    handleManageUser();
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setFilteredUsers(
      users?.filter(
        (item) =>
          item.username.includes(value) ||
          item.email.includes(value) ||
          item.phone.includes(value)
      )
    );
  };

  const value = {
    users,
    selectedUser,
    filteredUsers,
    handleCreateUser,
    handleUser,
    handleSearch,
    modals: {
      manageUser: { isOpen: isOpenManageUser, onClose: handleManageUser },
      createUser: { isOpen: isOpenCreateUser, onClose: handleCreateUser },
    },
  };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}