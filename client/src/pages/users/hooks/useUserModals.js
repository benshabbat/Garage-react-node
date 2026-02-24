import useOpenModal from "../../../hooks/useOpenModal";

/**
 * Custom hook for managing user-related modal states
 * @returns {Object} Modal handlers and states
 */
export const useUserModals = () => {
  const [handleManageUser, isOpenManageUser] = useOpenModal();
  const [handleCreateUser, isOpenCreateUser] = useOpenModal();
  const [handleCreateCar, isOpenModalCreateCar] = useOpenModal();
  const [handleEditUser, isOpenModalEditUser] = useOpenModal();
  const [handleDeleteUser, isOpenModalDeleteUser] = useOpenModal();

  return {
    manageUser: { isOpen: isOpenManageUser, handle: handleManageUser },
    createUser: { isOpen: isOpenCreateUser, handle: handleCreateUser },
    createCar: { isOpen: isOpenModalCreateCar, handle: handleCreateCar },
    editUser: { isOpen: isOpenModalEditUser, handle: handleEditUser },
    deleteUser: { isOpen: isOpenModalDeleteUser, handle: handleDeleteUser },
  };
};
