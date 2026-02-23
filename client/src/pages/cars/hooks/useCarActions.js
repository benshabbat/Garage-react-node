import { createService, updateCar, deleteCar } from "../../../utils";

/**
 * Custom hook for car CRUD operations
 * @param {Object} selectedCar - Currently selected car
 * @param {Function} setFilteredCars - Function to update filtered cars list
 * @returns {Object} CRUD operation functions
 */
export const useCarActions = (selectedCar, setFilteredCars) => {
  
  /**
   * Create a new service for a car
   */
  const onSubmitCreateService = async (e, formData, handleCreateService) => {
    e.preventDefault();
    await createService(selectedCar?._id, formData);
    handleCreateService();
  };

  /**
   * Edit existing car
   */
  const onSubmitEditCar = async (e, formData, handleEditCar) => {
    e.preventDefault();
    await updateCar(selectedCar?._id, formData);
    handleEditCar();
  };

  /**
   * Delete a car
   */
  const onSubmitDeleteCar = async (e, handleDeleteCar) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "deleteCar") {
      await deleteCar(selectedCar?._id, selectedCar?.owner._id.toString());
      handleDeleteCar();
      setFilteredCars((cars) =>
        cars.filter((car) => car._id !== selectedCar._id)
      );
    }
  };

  return {
    onSubmitCreateService,
    onSubmitEditCar,
    onSubmitDeleteCar,
  };
};
