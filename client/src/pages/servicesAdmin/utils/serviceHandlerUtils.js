/**
 * Handle service actions based on button click
 * @param {Event} e - Event object
 * @param {Array} services - List of services
 * @param {Function} setSelectedService - Function to set selected service
 * @param {Object} modals - Modal handlers
 * @param {Object} serviceActions - Service action handlers
 * @returns {Promise<void>}
 */
export const handleServiceAction = async (e, services, setSelectedService, modals, serviceActions) => {
  e.preventDefault();
  const { name, value } = e.target;
  setSelectedService(services.find((service) => service._id === value));

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
      await serviceActions.onSubmitDeleteService(modals.manageService.handle);
      break;
    case "editService":
      modals.editService.handle();
      break;
    default:
      modals.manageService.handle();
  }
};
