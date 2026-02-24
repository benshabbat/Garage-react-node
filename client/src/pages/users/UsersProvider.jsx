import { getUsers } from "../../features/admin/adminSlice";
import { UsersContext } from "./UsersContext";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
import { userFilterFn } from "./utils/userValidation";
import { handleUserAction as handleUserActionUtil } from "./utils/userHandlerUtils";
import { useUserModals } from "./hooks/useUserModals";
import { useUserHandlers } from "./hooks/useUserHandlers";

export default function UsersProvider({ children }) {
  const { users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState();

  // Modals management
  const modals = useUserModals();

  // Filtering and search
  const memoizedUserFilterFn = useCallback(userFilterFn, []);
  const { displayData: displayUsers, handleSearch, setFilteredData: setFilteredUsers, handleSort } = 
    useFilteredData(users, memoizedUserFilterFn);

  // User handlers
  const userHandlers = useUserHandlers(selectedUser, setFilteredUsers, users, modals);

  useEffect(() => {
    dispatch(getUsers());
  }, [
    modals.editUser.isOpen,
    modals.deleteUser.isOpen,
    modals.manageUser.isOpen,
    modals.createUser.isOpen,
    dispatch,
  ]);

  const handleUser = (e) => {
    handleUserActionUtil(e, users, setSelectedUser, modals);
  };

  const value = {
    useDeleteUser: userHandlers.useDeleteUser,
    useRegister: userHandlers.useRegister,
    displayUsers,
    selectedUser,
    handleUser,
    handleSearch,
    setFormData: userHandlers.setCarFormData,
    onSubmitCreateCar: userHandlers.onSubmitCreateCar,
    useEditUser: userHandlers.useEditUser,
    handleSort,
    modals,
  };
  
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
