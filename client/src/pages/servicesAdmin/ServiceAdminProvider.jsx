import { ServiceAdminContext } from "./ServiceAdminContext";
import { useState, useEffect, useCallback } from "react";
import { useAdminStore } from "../../stores/adminStore";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
import { serviceFilterFn, serviceStatusOptions } from "./utils/serviceValidation";
import { handleServiceAction as handleServiceActionUtil } from "./utils/serviceHandlerUtils";
import { useServiceModals } from "./hooks/useServiceModals";
import { useServiceHandlers } from "./hooks/useServiceHandlers";

export default function ServiceAdminProvider({ children }) {
  const services = useAdminStore((s) => s.services);
  const getServicesByType = useAdminStore((s) => s.getServicesByType);

  const [selectedService, setSelectedService] = useState();

  // Modals management
  const modals = useServiceModals();

  // Filtering and search
  const memoizedServiceFilterFn = useCallback(serviceFilterFn, []);
  const { displayData: displayServices, handleSearch } = 
    useFilteredData(services, memoizedServiceFilterFn);

  // Service handlers
  const serviceHandlers = useServiceHandlers(selectedService);

  useEffect(() => {
    getServicesByType();
  }, [
    modals.manageService.isOpen,
    modals.editStatusService.isOpen,
    modals.editService.isOpen,
    modals.editPaid.isOpen,
    getServicesByType,
  ]);

  const handleServiceIdAction = (e) => {
    handleServiceActionUtil(e, services, setSelectedService, modals, serviceHandlers.serviceActions);
  };

  const value = {
    options: serviceStatusOptions,
    displayServices,
    handleServiceIdAction,
    handleSearch,
    selectedService,
    useEditService: serviceHandlers.useEditService,
    modals,
  };

  return (
    <ServiceAdminContext.Provider value={value}>
      {children}
    </ServiceAdminContext.Provider>
  );
}

ServiceAdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
