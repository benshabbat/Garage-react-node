import { useState, useEffect } from "react";
import { useUserForm } from "./useUserForm";
import { useUserActions } from "./useUserActions";
import { useUsersUIStore } from "../../../stores/uiStores";
import { useAdminStore } from "../../../stores/adminStore";

/**
 * Custom hook for user action handlers
 * @param {Object} selectedUser - Currently selected user
 * @param {Function} setFilteredUsers - Function to update filtered users list
 * @param {Array} users - List of all users
 * @param {Object} modals - Modal handlers
 * @returns {Object} Handler functions for user operations
 */
export const useUserHandlers = (setFilteredUsers) => {
  const users = useAdminStore((s) => s.users);
  const selectedUser = useUsersUIStore((s) => s.selectedUser);
  const {
    createUserOpen,
    editUserOpen,
    toggleCreateUser,
    toggleEditUser,
    toggleDeleteUser,
    toggleManageUser,
  } = useUsersUIStore();

  const createUserForm = useUserForm(users, null, createUserOpen);

  // Form management for creating car
  const [carFormData, setCarFormData] = useState();

  // Server-side error for registration
  const [registerError, setRegisterError] = useState(null);

  useEffect(() => {
    if (!createUserOpen) {
      setRegisterError(null);
    }
  }, [createUserOpen]);

  // User actions
  const userActions = useUserActions(selectedUser, setFilteredUsers, users);

  /**
   * Hook for registering new user
   */
  const useRegister = () => {
    const onSubmit = async (e) => {
      const validationState = {
        isExistEmail: createUserForm.isExistEmail,
        isExistPhone: createUserForm.isExistPhone,
        isExistUser: createUserForm.isExistUser,
      };
      try {
        setRegisterError(null);
        await userActions.onSubmitRegister(
          e,
          createUserForm.formData,
          validationState,
          toggleCreateUser
        );
      } catch (error) {
        setRegisterError(error.message);
      }
    };

    return {
      setFormData: createUserForm.setFormData,
      onSubmit,
      isExistEmail: createUserForm.isExistEmail,
      isExistPhone: createUserForm.isExistPhone,
      isExistUser: createUserForm.isExistUser,
      registerError,
    };
  };

  /**
   * Hook for editing user
   */
  const useEditUser = () => {
    const editUserForm = useUserForm(users, selectedUser, editUserOpen, selectedUser?._id);

    const onSubmitEditUser = (e) => {
      const validationState = {
        isExistEmail: editUserForm.isExistEmail,
        isExistPhone: editUserForm.isExistPhone,
        isExistUser: editUserForm.isExistUser,
      };
      userActions.onSubmitEditUser(e, editUserForm.formData, validationState, toggleEditUser);
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
    userActions.onSubmitCreateCar(e, carFormData, useUsersUIStore.getState().toggleCreateCar);
  };

  /**
   * Hook for deleting user
   */
  const useDeleteUser = (e) => {
    userActions.onSubmitDeleteUser(e, toggleDeleteUser, toggleManageUser);
  };

  return {
    useRegister,
    useEditUser,
    useDeleteUser,
    onSubmitCreateCar,
    setCarFormData,
  };
};
