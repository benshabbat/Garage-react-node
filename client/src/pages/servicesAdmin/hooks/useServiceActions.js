import { deleteService, updateService } from "../../../api/services/serviceApi";
import { extractErrorMessage } from "../../../utils/handlerUtils";

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
    try {
      await updateService(selectedService?._id, formData);
      handleClick();
      // Data will be refreshed automatically by useEffect in ServiceAdminProvider
    } catch (err) {
      throw new Error(extractErrorMessage(err));
    }
  };

  /**
   * Delete a service
   */
  const onSubmitDeleteService = async (handleManageService) => {
    try {
      await deleteService(selectedService?._id);
      handleManageService();
    } catch (err) {
      throw new Error(extractErrorMessage(err));
    }
  };

  return {
    onSubmitEditService,
    onSubmitDeleteService,
  };
};
