import { updateCar, deleteCar } from "../../../api/services/carApi";
import { createService } from "../../../api/services/serviceApi";
import { extractErrorMessage } from "../../../utils/handlerUtils";

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
    try {
      await createService(selectedCar?._id, formData);
      handleCreateService();
    } catch (err) {
      throw new Error(extractErrorMessage(err));
    }
  };

  /**
   * Edit existing car
   */
  const onSubmitEditCar = async (e, formData, handleEditCar) => {
    e.preventDefault();
    try {
      await updateCar(selectedCar?._id, formData);
      handleEditCar();
    } catch (err) {
      throw new Error(extractErrorMessage(err));
    }
  };

  /**
   * Delete a car
   */
  const onSubmitDeleteCar = async (e, handleDeleteCar) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "deleteCar") {
      try {
        await deleteCar(selectedCar?._id, selectedCar?.owner._id.toString());
        handleDeleteCar();
        setFilteredCars((cars) => cars.filter((car) => car._id !== selectedCar._id));
      } catch (err) {
        throw new Error(extractErrorMessage(err));
      }
    }
  };

  return {
    onSubmitCreateService,
    onSubmitEditCar,
    onSubmitDeleteCar,
  };
};
