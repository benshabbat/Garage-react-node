import { useServiceForm } from "./useServiceForm";
import { useServiceActions } from "./useServiceActions";

/**
 * Custom hook for service action handlers
 * @param {Object} selectedService - Currently selected service
 * @returns {Object} Handler functions for service operations
 */
export const useServiceHandlers = (selectedService) => {
  // Service actions
  const serviceActions = useServiceActions(selectedService);

  /**
   * Hook for editing service
   */
  const useEditService = (handleClick) => {
    const editServiceForm = useServiceForm(selectedService);
    
    const onSubmit = (e) => {
      serviceActions.onSubmitEditService(e, editServiceForm.formData, handleClick);
    };
    
    return { 
      onSubmit, 
      formData: editServiceForm.formData, 
      setFormData: editServiceForm.setFormData 
    };
  };

  return {
    useEditService,
    serviceActions,
  };
};
