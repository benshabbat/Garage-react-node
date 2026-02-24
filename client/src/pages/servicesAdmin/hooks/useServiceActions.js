import { deleteService, updateService } from "../../../utils";

/**
 * Custom hook for service CRUD operations
 * @param {Object} selectedService - Currently selected service
 * @returns {Object} CRUD operation functions
 */
export const useServiceActions = (selectedService) => {
  
  /**
   * Edit existing service
   */
  const onSubmitEditService = async (e, formData, handleClick) => {
    e.preventDefault();
    await updateService(selectedService?._id, formData);
    handleClick();
    // Data will be refreshed automatically by useEffect in ServiceAdminProvider
  };

  /**
   * Delete a service
   */
  const onSubmitDeleteService = async (handleManageService) => {
    await deleteService(selectedService?._id);
    handleManageService();
  };

  return {
    onSubmitEditService,
    onSubmitDeleteService,
  };
};
