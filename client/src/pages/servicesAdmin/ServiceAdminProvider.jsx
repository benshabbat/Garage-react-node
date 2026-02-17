import { ServiceAdminContext } from "./ServiceAdminContext";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServicesByType } from "../../features/admin/adminSlice";
import { deleteService, updateService } from "../../utils";
import useOpenModal from "../../hooks/useOpenModal";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
export default function ServiceAdminProvider({ children }) {
  const { services } = useSelector((state) => state.admin);

  // const [formData, setFormData] = useState();
  const [selectedService, setSelctedService] = useState();

  const [handleManageService, isOpenManageService] = useOpenModal();
  const [handleEditService, isOpenEditService] = useOpenModal();
  const [handleStatus, isOpenStatus] = useOpenModal();
  const [handlePaid, isOpenPaid] = useOpenModal();

  // Use generic filtering hook
  const serviceFilterFn = useCallback((item, value) =>
    item.car?.numberPlate.includes(value) ||
    item.title.includes(value) ||
    item.description.includes(value) ||
    item.price.toString().includes(value) ||
    item.paid.toString().includes(value) ||
    item.status.includes(value),
    []
  );
  
  const { displayData: displayServices, handleSearch, setFilteredData: setFilteredServices } = 
    useFilteredData(services, serviceFilterFn);

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
        await deleteService(selectedService?._id); //i need to make for it function
        handleManageService();
        break;
      case "editService":
        handleEditService();
        break;
      default:
        handleManageService();
    }
  };

  //the solution working well done with useeffect.

  const useEditService = (handleClick) => {
    const [formData, setFormData] = useState(selectedService);
    
    // Update formData when selectedService changes
    useEffect(() => {
      setFormData(selectedService);
    }, [selectedService]);
    
    const onSubmit = async (e) => {
      e.preventDefault();
      const updated = await updateService(selectedService?._id, formData);
      handleClick();
      setFilteredServices(
        services.map((service) =>
          service._id === selectedService?._id ? { ...updated.data, car: selectedService?.car } : service
        )
      );
    };
    return { onSubmit, formData, setFormData };
  };
  const options = [
    { value: "pending", label: "Pending" },
    { value: "done", label: "Done" },
    { value: "on-work", label: "On work" },
  ];

  const value = {
    options,
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
