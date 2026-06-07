import { useAdminStore } from "../../../stores/adminStore";
import { useServicesUIStore } from "../../../stores/uiStores";
import { useServiceHandlers } from "./useServiceHandlers";
import { handleServiceAction } from "../utils/serviceHandlerUtils";

export const useServiceAdminHandlers = () => {
  const services = useAdminStore((s) => s.services);
  const {
    setSelectedService,
    toggleManageService,
    toggleEditStatus,
    toggleEditPaid,
    toggleEditService,
  } = useServicesUIStore();
  const { serviceActions } = useServiceHandlers();

  const handleServiceIdAction = (e) => {
    handleServiceAction(
      e,
      services,
      setSelectedService,
      { toggleManageService, toggleEditStatus, toggleEditPaid, toggleEditService },
      serviceActions
    );
  };

  return { handleServiceIdAction };
};
