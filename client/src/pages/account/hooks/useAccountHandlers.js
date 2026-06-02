import { useServiceRequestForm } from "./useServiceRequestForm";
import { useAccountActions } from "./useAccountActions";
import { useAccountUIStore } from "../../../stores/uiStores";
import { useUserStore } from "../../../stores/userStore";

export const useAccountHandlers = () => {
  const selectedCar = useAccountUIStore((s) => s.selectedCar);
  const toggleReqService = useAccountUIStore((s) => s.toggleReqService);
  const user = useUserStore((s) => s.user);
  const accountActions = useAccountActions(selectedCar, user);

  /**
   * Hook for requesting service
   */
  const useReqService = () => {
    const requestForm = useServiceRequestForm();
    
    const onSubmit = (e) => {
      accountActions.onSubmitReqService(e, requestForm.formData, toggleReqService);
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
