import "../../components/table/table.css";
import { UsersContext } from "./UsersContext";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/admin/adminSlice";
import useOpenModel from "../../hooks/useOpenModel";
import { deleteUser } from "../../utils";
//TODO:maybe i dont need to move users as props
export default function UsersProvider({ children }) {
  const { users } = useSelector((state) => state.admin);

  const [selectedUser, setSelctedUser] = useState();
  const [filteredUsers, setFilteredUsers] = useState();

  const [handleManageUser, isOpenManageUser] = useOpenModel();
  const [handleCreateUser, isOpenCreateUser] = useOpenModel();
  const [handleCreateCar, isOpenModelCreateCar] = useOpenModel();
  const [handleEditUser, isOpenModelEditUser] = useOpenModel();
  const displayUsers = filteredUsers || users;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [isOpenManageUser, isOpenCreateUser, dispatch]);

  const handleUser = async (e) => {
    e.preventDefault();

    const { value, name } = e.target;
    setSelctedUser(users.find((user) => user._id === value));

    switch (name) {
      case "editUser":
        handleEditUser();
        break;
      case "createCar":
        handleCreateCar();
        break;
      case "deleteUser":
        await deleteUser(value);
        break;
      default:
        handleManageUser();
    }
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
    displayUsers,
    users,
    selectedUser,
    filteredUsers,
    handleCreateUser,
    handleUser,
    handleSearch,
    modals: {
      manageUser: { isOpen: isOpenManageUser, onClose: handleManageUser },
      createUser: { isOpen: isOpenCreateUser, onClose: handleCreateUser },
      createCar: { isOpen: isOpenModelCreateCar, onClose: handleCreateCar },
      editUser: { isOpen: isOpenModelEditUser, onClose: handleEditUser },
    },
  };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}
