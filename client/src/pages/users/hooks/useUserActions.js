import { deleteUser, updateUser, createUser } from "../../../api/services/userApi";
import { createCar } from "../../../api/services/carApi";
import { isValidUserName, isValidCar } from "../utils/userValidation";
import { extractErrorMessage } from "../../../utils/handlerUtils";
import { useToastStore } from "../../../stores/toastStore";

/**
 * Custom hook for user CRUD operations
 * @param {Object} selectedUser - Currently selected user
 * @param {Function} setFilteredUsers - Function to update filtered users list
 * @param {Array} users - List of all users
 * @returns {Object} CRUD operation functions
 */
export const useUserActions = (selectedUser, setFilteredUsers, users) => {
  const showToast = useToastStore((s) => s.show);

  /**
   * Create a new car for a user
   */
  const onSubmitCreateCar = async (e, formData, handleCreateCar) => {
    e.preventDefault();
    if (isValidCar(formData?.numberPlate)) {
      await createCar(selectedUser?._id, formData);
      handleCreateCar();
    }
  };

  /**
   * Register a new user
   */
  const onSubmitRegister = async (e, formData, validationState, handleCreateUser) => {
    e.preventDefault();
    const { isExistEmail, isExistPhone, isExistUser } = validationState;

    if (isValidUserName(formData) && !isExistEmail && !isExistPhone && !isExistUser) {
      try {
        const newUser = await createUser(formData);
        handleCreateUser();
        setFilteredUsers(() => [...users, newUser.data]);
        showToast("User created successfully ✓");
      } catch (error) {
        throw new Error(extractErrorMessage(error));
      }
    } else {
      throw new Error("Please fix the validation errors before submitting.");
    }
  };

  /**
   * Edit existing user
   */
  const onSubmitEditUser = async (e, formData, validationState, handleEditUser) => {
    e.preventDefault();
    const { isExistEmail, isExistPhone, isExistUser } = validationState;

    if (isValidUserName(formData) && !isExistEmail && !isExistPhone && !isExistUser) {
      const updated = await updateUser(selectedUser?._id, formData);
      handleEditUser();
      setFilteredUsers(users.map((user) => (user._id === selectedUser?._id ? updated.data : user)));
      showToast("User updated successfully ✓");
    }
  };

  /**
   * Delete a user
   */
  const onSubmitDeleteUser = async (e, handleDeleteUser, handleManageUser) => {
    e.preventDefault();
    try {
      await deleteUser(selectedUser?._id);
      handleDeleteUser();
      handleManageUser();
      setFilteredUsers(users?.filter((user) => user._id !== selectedUser?._id));
      showToast("User deleted ✓");
    } catch (err) {
      throw new Error(extractErrorMessage(err));
    }
  };

  return {
    onSubmitCreateCar,
    onSubmitRegister,
    onSubmitEditUser,
    onSubmitDeleteUser,
  };
};
