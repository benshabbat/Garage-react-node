import { ServiceAdminContext } from "./ServiceAdminContext";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServicesByType } from "../../features/admin/adminSlice";
import useOpenModal from "../../hooks/useOpenModal";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
import { serviceFilterFn, serviceStatusOptions } from "./utils/serviceValidation";
import { useServiceForm } from "./hooks/useServiceForm";
import { useServiceActions } from "./hooks/useServiceActions";
export default function ServiceAdminProvider({ children }) {
  const { services } = useSelector((state) => state.admin);
  const [selectedService, setSelctedService] = useState();

  // Modals
  const [handleManageService, isOpenManageService] = useOpenModal();
  const [handleEditService, isOpenEditService] = useOpenModal();
  const [handleStatus, isOpenStatus] = useOpenModal();
  const [handlePaid, isOpenPaid] = useOpenModal();

  // Filtering and search
  const memoizedServiceFilterFn = useCallback(serviceFilterFn, []);
  const { displayData: displayServices, handleSearch, setFilteredData: setFilteredServices } = 
    useFilteredData(services, memoizedServiceFilterFn);

  // Service actions
  const serviceActions = useServiceActions(selectedService, setFilteredServices, services);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServicesByType());
  }, [
    isOpenManageService,
    isOpenStatus,
    isOpenEditService,
    isOpenPaid,
    dispatch,
  ]);

  const handleServiceIdAction = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSelctedService(services.find((service) => service._id === value));

    switch (name) {
      case "manage":
        handleManageService();
        break;
      case "editStatus":
        handleStatus();
        break;
      case "editPaid":
        handlePaid();
        break;
      case "deleteService":
        await serviceActions.onSubmitDeleteService(handleManageService);
        break;
      case "editService":
        handleEditService();
        break;
      default:
        handleManageService();
    }
  };

  // Hook for editing service
  const useEditService = (handleClick) => {
    const editServiceForm = useServiceForm(selectedService);
    
    const onSubmit = (e) => {
      serviceActions.onSubmitEditService(e, editServiceForm.formData, handleClick);
    };
    
    return { 
      onSubmit, 
      formData: editServiceForm.formData, 
      setFormData: editServiceForm.setFormData 
    };
  };

  const value = {
    options: serviceStatusOptions,
    displayServices,
    handleServiceIdAction,
    handleSearch,
    selectedService,
    useEditService,
    modals: {
      manageService: {
        isOpen: isOpenManageService,
        handle: handleManageService,
      },
      editStatusService: { isOpen: isOpenStatus, handle: handleStatus },
      editPaid: {
        isOpen: isOpenPaid,
        handle: handlePaid,
      },
      editService: {
        isOpen: isOpenEditService,
        handle: handleEditService,
      },
    },
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
