import { useServiceRequestForm } from "./useServiceRequestForm";
import { useAccountActions } from "./useAccountActions";

/**
 * Custom hook for account action handlers
 * @param {Object} selectedCar - Currently selected car
 * @param {Object} user - Current user
 * @param {Object} modals - Modal handlers
 * @returns {Object} Handler functions for account operations
 */
export const useAccountHandlers = (selectedCar, user, modals) => {
  // Account actions
  const accountActions = useAccountActions(selectedCar, user);

  /**
   * Hook for requesting service
   */
  const useReqService = () => {
    const requestForm = useServiceRequestForm();
    
    const onSubmit = (e) => {
      accountActions.onSubmitReqService(e, requestForm.formData, modals.reqService.handle);
    };
    
    return { 
      setFormData: requestForm.setFormData, 
      onSubmit 
    };
  };

  return {
    useReqService,
  };
};
