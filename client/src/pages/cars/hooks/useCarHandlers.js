import { useFormData as useCarForm } from "../../../hooks/useFormData";
import { useCarActions } from "./useCarActions";
import { useCarsUIStore } from "../../../stores/uiStores";

export const useCarHandlers = (setFilteredCars) => {
  const selectedCar = useCarsUIStore((s) => s.selectedCar);
  const toggleCreateService = useCarsUIStore((s) => s.toggleCreateService);
  const toggleEditCar = useCarsUIStore((s) => s.toggleEditCar);
  const toggleDeleteCar = useCarsUIStore((s) => s.toggleDeleteCar);
  // Form management
  const serviceForm = useCarForm(null);
  
  // Car actions
  const carActions = useCarActions(selectedCar, setFilteredCars);

  /**
   * Hook for creating service
   */
  const useCreateService = () => {
    const onSubmit = (e) => {
      carActions.onSubmitCreateService(e, serviceForm.formData, toggleCreateService);
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
      carActions.onSubmitEditCar(e, editCarForm.formData, toggleEditCar);
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
    carActions.onSubmitDeleteCar(e, toggleDeleteCar);
  };

  return {
    useCreateService,
    useEditCar,
    useDeleteCar,
  };
};
