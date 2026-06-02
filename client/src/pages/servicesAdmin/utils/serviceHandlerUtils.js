import { resolveActionTarget } from "../../../utils/handlerUtils";

export const handleServiceAction = async (
  e,
  services,
  setSelectedService,
  { toggleManageService, toggleEditStatus, toggleEditPaid, toggleEditService },
  serviceActions
) => {
  const name = resolveActionTarget(e, services, setSelectedService);

  switch (name) {
    case "manage":      toggleManageService(); break;
    case "editStatus":  toggleEditStatus();    break;
    case "editPaid":    toggleEditPaid();      break;
    case "deleteService":
      if (window.confirm("Are you sure you want to delete this service?")) {
        await serviceActions.onSubmitDeleteService(toggleManageService);
      }
      break;
    case "editService": toggleEditService();   break;
    default:            toggleManageService();
  }
};
