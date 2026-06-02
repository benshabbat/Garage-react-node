import { useServiceForm } from "./useServiceForm";
import { useServiceActions } from "./useServiceActions";
import { useServicesUIStore } from "../../../stores/uiStores";

export const useServiceHandlers = () => {
  const selectedService = useServicesUIStore((s) => s.selectedService);
  const serviceActions = useServiceActions(selectedService);

  const useEditService = (handleClick) => {
    const editServiceForm = useServiceForm(selectedService);
    const onSubmit = (e) => {
      serviceActions.onSubmitEditService(e, editServiceForm.formData, handleClick);
    };
    return {
      onSubmit,
      formData: editServiceForm.formData,
      setFormData: editServiceForm.setFormData,
    };
  };

  return { useEditService, serviceActions };
};
