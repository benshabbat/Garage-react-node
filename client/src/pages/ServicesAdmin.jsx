import "../components/table/table.css";
import React, { useState, useEffect } from "react";
import useOpenModel from "../hooks/useOpenModel";
import ManageService from "../components/manage/ManageService";
import { useDispatch } from "react-redux";
import { getServicesByType } from "../features/admin/adminSlice";
import EditStatusService from "../components/edit/EditStatusService";
import EditPaidService from "../components/edit/EditPaidService";
const ServicesAdmin = ({ services }) => {
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
          {" "}
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
  return (
    <>
      <div className="table-container">
        <section className="table__header">
          <h1>Services</h1>
          <div className="input-group">
            <input
              type="search"
              placeholder="Search Data..."
              onChange={filterSearch}
            />
          </div>
        </section>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>car</th>
                <th>title</th>
                <th>description</th>
                <th>price</th>
                <th>paid</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {servicesFilter
                ? servicesFilter?.map(bodyServices)
                : services?.map(bodyServices)}
            </tbody>
          </table>
        </section>
      </div>
      <ManageService
        service={service}
        handelClick={handelService}
        isOpen={isOpenService}
      />
      <EditStatusService
        service={service}
        handelClick={handleStatus}
        isOpen={isOpenStatus}
      />
      <EditPaidService
        service={service}
        handelClick={handlePaid}
        isOpen={isOpenPaid}
      />
    </>
  );
};

export default ServicesAdmin;
