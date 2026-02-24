import { deleteUser, createCar, updateUser, createUser } from "../../../utils";
import { formatPhone } from "../../../utils/formatters";
import { isValidUserName, isValidCar } from "../utils/userValidation";

/**
 * Custom hook for user CRUD operations
 * @param {Object} selectedUser - Currently selected user
 * @param {Function} setFilteredUsers - Function to update filtered users list
 * @param {Array} users - List of all users
 * @returns {Object} CRUD operation functions
 */
export const useUserActions = (selectedUser, setFilteredUsers, users) => {
  
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
    
    if (
      isValidUserName(formData) &&
      !isExistEmail &&
      !isExistPhone &&
      !isExistUser
    ) {
      const newUser = await createUser(formData);
      handleCreateUser();
      setFilteredUsers(() => [...users, newUser.data]);
    }
  };

  /**
   * Edit existing user
   */
  const onSubmitEditUser = async (e, formData, validationState, handleEditUser) => {
    e.preventDefault();
    const { isExistEmail, isExistPhone, isExistUser } = validationState;
    
    if (
      isValidUserName(formData) &&
      !isExistEmail &&
      !isExistPhone &&
      !isExistUser
    ) {
      await updateUser(selectedUser?._id, formData);
      handleEditUser();
      setFilteredUsers(
        users.map((user) =>
          user._id === selectedUser?._id
            ? { ...formData, phone: formatPhone(formData.phone) }
            : user
        )
      );
    }
  };

  /**
   * Delete a user
   */
  const onSubmitDeleteUser = async (e, handleDeleteUser, handleManageUser) => {
    e.preventDefault();
    await deleteUser(selectedUser?._id);
    handleDeleteUser();
    handleManageUser();
    setFilteredUsers(users?.filter((user) => user._id !== selectedUser?._id));
  };

  return {
    onSubmitCreateCar,
    onSubmitRegister,
    onSubmitEditUser,
    onSubmitDeleteUser,
  };
};
