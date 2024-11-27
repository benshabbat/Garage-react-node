import "../components/table/table.css";
import { ServiceAdminContext } from "./ServiceAdminContext";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServicesByType } from "../../features/admin/adminSlice";
import useOpenModel from "../../hooks/useOpenModel";

export default function ServiceAdminProvider({ children }) {
  const { services } = useSelector((state) => state.admin);

  const [selectedService, setSelctedService] = useState();
  const [filteredServices, setFilteredServices] = useState();

  const [handelManageService, isOpenManageService] = useOpenModel();
  const [handleStatus, isOpenStatus] = useOpenModel();
  const [handlePaid, isOpenPaid] = useOpenModel();

  const displayServices = filteredServices || selectedService;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServicesByType());
  }, [isOpenManageService, isOpenStatus, isOpenPaid, dispatch]);

  const handleServiceIdAction = (e) => {
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

  const value = {
    displayServices,
    handleServiceIdAction,
    handleSearch,
    selectedService,
    modals: {
      manageSevice: {
        isOpen: isOpenManageService,
        onClose: handelManageService,
      },
      editStatusService: { isOpen: isOpenStatus, onClose: handleStatus },
      editPaid: {
        isOpen: isOpenPaid,
        onClose: handlePaid,
      },
    },
  };

  return <ServiceAdminContext value={value}>{children}</ServiceAdminContext>;
}
