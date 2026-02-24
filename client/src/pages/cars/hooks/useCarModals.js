import useOpenModal from "../../../hooks/useOpenModal";

/**
 * Custom hook for managing car-related modal states
 * @returns {Object} Modal handlers and states
 */
export const useCarModals = () => {
  const [handleManageCar, isOpenManageCar] = useOpenModal();
  const [handleEditCar, isOpenModalEditCar] = useOpenModal();
  const [handleDeleteCar, isOpenModalDeleteCar] = useOpenModal();
  const [handleCreateService, isOpenModalCreateService] = useOpenModal();

  return {
    manageCar: { isOpen: isOpenManageCar, handle: handleManageCar },
    editCar: { isOpen: isOpenModalEditCar, handle: handleEditCar },
    createService: { isOpen: isOpenModalCreateService, handle: handleCreateService },
    deleteCar: { isOpen: isOpenModalDeleteCar, handle: handleDeleteCar },
  };
};
