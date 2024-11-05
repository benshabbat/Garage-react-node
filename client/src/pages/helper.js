import { useState, useEffect } from "react";
import useOpenModel from "../hooks/useOpenModel";
import { useDispatch, useSelector } from "react-redux";
import { getServicesByType } from "../features/admin/adminSlice";

export function useClouser() {
  const { services } = useSelector((state) => state.admin);
  const [servicesFilter, setServicesFilter] = useState();
  const [service, setService] = useState();
  const [handelService, isOpenService] = useOpenModel();
  const [handleStatus, isOpenStatus] = useOpenModel();
  const [handlePaid, isOpenPaid] = useOpenModel();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServicesByType());
  }, [isOpenService, isOpenStatus, isOpenPaid]);
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
    if (name === "editPadid") handlePaid();
  };
  const bodyServices = (service) => {
    return (
      <tr key={service?._id}>
        <td>
          <button name="manage" value={service?._id} onClick={handleServiceId}>
            Manage
          </button>
        </td>
        <td>{service?.car?.numberPlate}</td>
        <td>{service?.title}</td>
        <td>{service?.description}</td>
        <td>{service?.price}</td>
        <td>
          <button
            name="editPadid"
            value={service?._id}
            onClick={handleServiceId}
          >
            {service?.paid ? "true" : "false"}
          </button>
        </td>
        <td>
          <button
            className={`status ${service?.status}`}
            name="editStatus"
            value={service?._id}
            onClick={handleServiceId}
          >
            {service?.status}
          </button>
        </td>
      </tr>
    );
  };

  const resService = servicesFilter
    ? servicesFilter?.map(bodyServices)
    : services?.map(bodyServices);
  return {
    bodyServices,
    filterSearch,
    servicesFilter,
    service,
    isOpenService,
    isOpenStatus,
    isOpenPaid,
    services,
    handelService,
    resService
  };
}
