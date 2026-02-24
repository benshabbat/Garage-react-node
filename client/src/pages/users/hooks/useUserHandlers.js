import { useState } from "react";
import { useUserForm } from "./useUserForm";
import { useUserActions } from "./useUserActions";

/**
 * Custom hook for user action handlers
 * @param {Object} selectedUser - Currently selected user
 * @param {Function} setFilteredUsers - Function to update filtered users list
 * @param {Array} users - List of all users
 * @param {Object} modals - Modal handlers
 * @returns {Object} Handler functions for user operations
 */
export const useUserHandlers = (selectedUser, setFilteredUsers, users, modals) => {
  // Form management for creating user
  const createUserForm = useUserForm(users, null, modals.createUser.isOpen);
  
  // Form management for creating car
  const [carFormData, setCarFormData] = useState();
  
  // User actions
  const userActions = useUserActions(selectedUser, setFilteredUsers, users);

  /**
   * Hook for registering new user
   */
  const useRegister = () => {
    const onSubmit = (e) => {
      const validationState = {
        isExistEmail: createUserForm.isExistEmail,
        isExistPhone: createUserForm.isExistPhone,
        isExistUser: createUserForm.isExistUser,
      };
      userActions.onSubmitRegister(e, createUserForm.formData, validationState, modals.createUser.handle);
    };
    
    return { 
      setFormData: createUserForm.setFormData, 
      onSubmit, 
      isExistEmail: createUserForm.isExistEmail, 
      isExistPhone: createUserForm.isExistPhone, 
      isExistUser: createUserForm.isExistUser 
    };
  };

  /**
   * Hook for editing user
   */
  const useEditUser = () => {
    const editUserForm = useUserForm(users, selectedUser, modals.editUser.isOpen, selectedUser?._id);
    
    const onSubmitEditUser = (e) => {
      const validationState = {
        isExistEmail: editUserForm.isExistEmail,
        isExistPhone: editUserForm.isExistPhone,
        isExistUser: editUserForm.isExistUser,
      };
      userActions.onSubmitEditUser(e, editUserForm.formData, validationState, modals.editUser.handle);
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

  /**
   * Handle car creation
   */
  const onSubmitCreateCar = (e) => {
    userActions.onSubmitCreateCar(e, carFormData, modals.createCar.handle);
  };

  /**
   * Hook for deleting user
   */
  const useDeleteUser = (e) => {
    userActions.onSubmitDeleteUser(e, modals.deleteUser.handle, modals.manageUser.handle);
  };

  return {
    useRegister,
    useEditUser,
    useDeleteUser,
    onSubmitCreateCar,
    setCarFormData,
  };
};
