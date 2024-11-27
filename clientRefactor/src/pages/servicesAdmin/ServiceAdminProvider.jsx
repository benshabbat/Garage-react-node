import "../components/table/table.css";
import { useState, useEffect } from "react";
import useOpenModel from "../../hooks/useOpenModel";

import { useDispatch, useSelector } from "react-redux";
import { getServicesByType } from "../../features/admin/adminSlice";

import { ServiceAdminContext } from "./ServiceAdminContext";

export default function ServiceAdminProvider({ children }) {
  const { services } = useSelector((state) => state.admin);

  const [service, setService] = useState();
  const [servicesFilter, setServicesFilter] = useState();

  const [handelService, isOpenService] = useOpenModel();
  const [handleStatus, isOpenStatus] = useOpenModel();
  const [handlePaid, isOpenPaid] = useOpenModel();

  const displayServices = servicesFilter || services;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServicesByType());
  }, [isOpenService, isOpenStatus, isOpenPaid, dispatch]);


  const filterSearch = (e) => {
    const { value } = e.target;

    setServicesFilter(
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

  const handleServiceId = (e) => {
    const { name } = e.target;
    setService(services.find((service) => service._id === e.target.value));
    if (name === "manage") {
      handelService();
    }
    if (name === "editStatus") handleStatus();
    if (name === "editPaid") handlePaid();
  };


  const value = {displayServices,handleServiceId,filterSearch,service};

  return <ServiceAdminContext value={value}>{children}</ServiceAdminContext>;
}
