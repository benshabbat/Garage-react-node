import "../components/table/table.css";
import { useState, useEffect } from "react";
import useOpenModel from "../hooks/useOpenModel";
import ManageService from "../components/manage/ManageService";
import { useDispatch, useSelector } from "react-redux";
import { getServicesByType } from "../features/admin/adminSlice";
import EditStatusService from "../components/edit/EditStatusService";
import EditPaidService from "../components/edit/EditPaidService";

export function useServicesAdmin() {
  const { services } = useSelector((state) => state.admin);
  const [servicesFilter, setServicesFilter] = useState();
  const [service, setService] = useState();
  const [handelService, isOpenService] = useOpenModel();
  const [handleStatus, isOpenStatus] = useOpenModel();
  const [handlePaid, isOpenPaid] = useOpenModel();
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

  function Search() {
    return (
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
    );
  }

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
        <td data-label="Actions">
          <button name="manage" value={service?._id} onClick={handleServiceId}>
            Manage
          </button>
        </td>
        <td data-label="Car">{service?.car?.numberPlate}</td>
        <td data-label="Title">{service?.title}</td>
        <td data-label="Description">{service?.description}</td>
        <td data-label="Price">{service?.price}</td>
        <td data-label="Payment Status">
          <button
            name="editPadid"
            value={service?.paid ? "true" : "false"}
            onClick={handleServiceId}
          >
            {service?.paid ? "Paid" : "Unpaid"}
          </button>
        </td>
        <td data-label="Status">
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
  function HandelAdminServices() {
    return (
      <>
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
  }

  function TableServiceAdmin() {
    return (
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
    );
  }

  function PageServiceAdmin() {
    return (
      <>
        <div className="table-container">
          {Search()}
          <TableServiceAdmin />
        </div>
        <HandelAdminServices />
      </>
    );
  }
  return { PageServiceAdmin };
}
