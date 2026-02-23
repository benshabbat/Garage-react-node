import { getUsers } from "../../features/admin/adminSlice";
import { UsersContext } from "./UsersContext";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useOpenModal from "../../hooks/useOpenModal";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
import { userFilterFn } from "./utils/userValidation";
import { useUserForm } from "./hooks/useUserForm";
import { useUserActions } from "./hooks/useUserActions";

export default function UsersProvider({ children }) {
  const { users } = useSelector((state) => state.admin);
  const [selectedUser, setSelctedUser] = useState();
  
  // Modals
  const [handleManageUser, isOpenManageUser] = useOpenModal();
  const [handleCreateUser, isOpenCreateUser] = useOpenModal();
  const [handleCreateCar, isOpenModalCreateCar] = useOpenModal();
  const [handleEditUser, isOpenModalEditUser] = useOpenModal();
  const [handleDeleteUser, isOpenModalDeleteUser] = useOpenModal();

  // Filtering and search
  const memoizedUserFilterFn = useCallback(userFilterFn, []);
  const { displayData: displayUsers, handleSearch, setFilteredData: setFilteredUsers, handleSort } = 
    useFilteredData(users, memoizedUserFilterFn);

  // Form management for creating user
  const createUserForm = useUserForm(users, null, isOpenCreateUser);
  
  // Form management for creating car
  const [carFormData, setCarFormData] = useState();
  
  // User actions
  const userActions = useUserActions(selectedUser, setFilteredUsers, users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [
    isOpenModalEditUser,
    isOpenModalDeleteUser,
    isOpenManageUser,
    isOpenCreateUser,
    dispatch,
  ]);

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
        handleDeleteUser();
        break;
      default:
        handleManageUser();
    }
  };

  // Handle car creation
  const onSubmitCreateCar = (e) => {
    userActions.onSubmitCreateCar(e, carFormData, handleCreateCar);
  };

  // Hook for editing user
  const useEditUser = () => {
    const editUserForm = useUserForm(users, selectedUser, isOpenModalEditUser, selectedUser?._id);
    
    const onSubmitEditUser = (e) => {
      const validationState = {
        isExistEmail: editUserForm.isExistEmail,
        isExistPhone: editUserForm.isExistPhone,
        isExistUser: editUserForm.isExistUser,
      };
      userActions.onSubmitEditUser(e, editUserForm.formData, validationState, handleEditUser);
    };

    return {
      formData: editUserForm.formData,
      setFormData: editUserForm.setFormData,
      onSubmitEditUser,
      isExistEmail: editUserForm.isExistEmail,
      isExistPhone: editUserForm.isExistPhone,
      isExistUser: editUserForm.isExistUser,
    };
  };

  // Hook for registering new user
  function useRegister() {
    const onSubmit = (e) => {
      const validationState = {
        isExistEmail: createUserForm.isExistEmail,
        isExistPhone: createUserForm.isExistPhone,
        isExistUser: createUserForm.isExistUser,
      };
      userActions.onSubmitRegister(e, createUserForm.formData, validationState, handleCreateUser);
    };
    
    return { 
      setFormData: createUserForm.setFormData, 
      onSubmit, 
      isExistEmail: createUserForm.isExistEmail, 
      isExistPhone: createUserForm.isExistPhone, 
      isExistUser: createUserForm.isExistUser 
    };
  }

  // Delete user handler
  const useDeleteUser = (e) => {
    userActions.onSubmitDeleteUser(e, handleDeleteUser, handleManageUser);
  };

  const value = {
    useDeleteUser,
    useRegister,
    displayUsers,
    selectedUser,
    handleUser,
    handleSearch,
    setFormData: setCarFormData,
    onSubmitCreateCar,
    useEditUser,
    handleSort,
    modals: {
      manageUser: { isOpen: isOpenManageUser, handle: handleManageUser },
      createUser: { isOpen: isOpenCreateUser, handle: handleCreateUser },
      createCar: { isOpen: isOpenModalCreateCar, handle: handleCreateCar },
      editUser: { isOpen: isOpenModalEditUser, handle: handleEditUser },
      deleteUser: { isOpen: isOpenModalDeleteUser, handle: handleDeleteUser },
    },
  };
  
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
