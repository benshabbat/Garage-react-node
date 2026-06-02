import { resolveActionTarget } from "../../../utils/handlerUtils";

export const handleServiceAction = async (e, services, setSelectedService, modals, serviceActions) => {
  const name = resolveActionTarget(e, services, setSelectedService);

  switch (name) {
    case "manage":
      modals.manageService.handle();
      break;
    case "editStatus":
      modals.editStatusService.handle();
      break;
    case "editPaid":
      modals.editPaid.handle();
      break;
    case "deleteService":
      if (window.confirm("Are you sure you want to delete this service?")) {
        await serviceActions.onSubmitDeleteService(modals.manageService.handle);
      }
      break;
    case "editService":
      modals.editService.handle();
      break;
    default:
      modals.manageService.handle();
  }
};
