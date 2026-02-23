import { deleteService, updateService } from "../../../utils";

/**
 * Custom hook for service CRUD operations
 * @param {Object} selectedService - Currently selected service
 * @param {Function} setFilteredServices - Function to update filtered services list
 * @param {Array} services - List of all services
 * @returns {Object} CRUD operation functions
 */
export const useServiceActions = (selectedService, setFilteredServices, services) => {
  
  /**
   * Edit existing service
   */
  const onSubmitEditService = async (e, formData, handleClick) => {
    e.preventDefault();
    const updated = await updateService(selectedService?._id, formData);
    handleClick();
    setFilteredServices(
      services.map((service) =>
        service._id === selectedService?._id 
          ? { ...updated.data, car: selectedService?.car } 
          : service
      )
    );
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
