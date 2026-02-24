import { useCarForm } from "./useCarForm";
import { useCarActions } from "./useCarActions";

/**
 * Custom hook for car action handlers
 * @param {Object} selectedCar - Currently selected car
 * @param {Function} setFilteredCars - Function to update filtered cars list
 * @param {Object} modals - Modal handlers
 * @returns {Object} Handler functions for car operations
 */
export const useCarHandlers = (selectedCar, setFilteredCars, modals) => {
  // Form management
  const serviceForm = useCarForm(null);
  
  // Car actions
  const carActions = useCarActions(selectedCar, setFilteredCars);

  /**
   * Hook for creating service
   */
  const useCreateService = () => {
    const onSubmit = (e) => {
      carActions.onSubmitCreateService(e, serviceForm.formData, modals.createService.handle);
    };
    return { 
      onSubmit, 
      setFormData: serviceForm.setFormData, 
      formData: serviceForm.formData 
    };
  };

  /**
   * Hook for editing car
   */
  const useEditCar = () => {
    const editCarForm = useCarForm(selectedCar);

    const onSubmit = (e) => {
      carActions.onSubmitEditCar(e, editCarForm.formData, modals.editCar.handle);
    };
    
    return { 
      onSubmit, 
      setFormData: editCarForm.setFormData, 
      formData: editCarForm.formData
    };
  };

  /**
   * Hook for deleting car
   */
  const useDeleteCar = (e) => {
    carActions.onSubmitDeleteCar(e, modals.deleteCar.handle);
  };

  return {
    useCreateService,
    useEditCar,
    useDeleteCar,
  };
};
