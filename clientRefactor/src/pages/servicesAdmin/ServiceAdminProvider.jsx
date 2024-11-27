import "../../components/table/table.css";
import { ServiceAdminContext } from "./ServiceAdminContext";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServicesByType } from "../../features/admin/adminSlice";
import { deleteService, updateService } from "../../utils";
import useOpenModel from "../../hooks/useOpenModel";
export default function ServiceAdminProvider({ children }) {
  const { services } = useSelector((state) => state.admin);

  const [selectedService, setSelctedService] = useState();
  const [filteredServices, setFilteredServices] = useState();

  const [handelManageService, isOpenManageService] = useOpenModel();
  const [handleEditService, isOpenEditService] = useOpenModel();
  const [handleStatus, isOpenStatus] = useOpenModel();
  const [handlePaid, isOpenPaid] = useOpenModel();

  const displayServices = filteredServices || services;

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
        handelManageService();
        break;
      case "editStatus":
        handleStatus();
        break;
      case "editPaid":
        handlePaid();
        break;
      case "deleteService":
        await deleteService(selectedService?._id);
        handelManageService();
        break;
      case "editService":
        handleEditService();
        break;
      default:
        handelManageService();
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    setFilteredServices(
      services.filter(
        (item) =>
          item.car?.numberPlate.includes(value) ||
          item.title.includes(value) ||
          item.description.includes(value) ||
          item.price.toString().includes(value) ||
          item.paid.toString().includes(value) ||
          item.status.includes(value)
      )
    );
  };
  const useEditService = (handleClick) => {
    const [formData, setFormData] = useState(selectedService);
    const onSubmit = async (e) => {
      e.preventDefault();
      await updateService(selectedService?._id, formData);
      handleClick();
    };
    return { onSubmit, formData, setFormData };
  };

  const value = {
    displayServices,
    handleServiceIdAction,
    handleSearch,
    selectedService,
    modals: {
      manageService: {
        isOpen: isOpenManageService,
        onClose: handelManageService,
      },
      editStatusService: { isOpen: isOpenStatus, onClose: handleStatus },
      editPaid: {
        isOpen: isOpenPaid,
        onClose: handlePaid,
      },
      editService: {
        isOpen: isOpenEditService,
        onClose: handleEditService,
      },
    },
    useEditService,
  };

  return (
    <ServiceAdminContext.Provider value={value}>
      {children}
    </ServiceAdminContext.Provider>
  );
}
