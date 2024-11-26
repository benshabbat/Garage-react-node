import "../../components/table/table.css";
import { UsersContext } from "./UsersContext";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/admin/adminSlice";
import useOpenModel from "../../hooks/useOpenModel";
import { deleteUser,createCar,updateUser } from "../../utils";
import { validCar , validPhone, validPass} from "../../validation/valid";
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



  const [formData, setFormData] = useState();

  const onSubmitCreateCar = async (e) => {
    e.preventDefault();
    if (validCar(formData?.numberPlate)) {
      await createCar(selectedUser?._id, formData);
      handleCreateCar();
    }
  };

  const onSubmitEditUser = async (e) => { 
    e.preventDefault();
    if (validPhone(formData?.phone) && validPass(formData?.password)) {
      await updateUser(selectedUser?._id, formData);
      handleEditUser();
    }
  };


  const value = {
    displayUsers,
    users,
    selectedUser,
    filteredUsers,
    handleCreateUser,
    handleUser,
    handleSearch,
    setFormData,
    formData,
    onSubmitCreateCar,
    onSubmitEditUser,
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
