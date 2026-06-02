import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { exportToCsv } from "../../utils/exportCsv";
import { useAdminStore } from "../../stores/adminStore";
import useFilteredData from "../../hooks/useFilteredData";
import { useCallback, useEffect } from "react";
import { serviceFilterFn } from "./utils/serviceValidation";
import { useServicesUIStore } from "../../stores/uiStores";
import { useServiceAdminHandlers } from "./hooks/useServiceAdminHandlers";

export default function ServiceAdminTable() {
  const services = useAdminStore((s) => s.services);
  const getServicesByType = useAdminStore((s) => s.getServicesByType);
  const { manageServiceOpen, editStatusOpen, editServiceOpen, editPaidOpen } = useServicesUIStore();
  const { handleServiceIdAction } = useServiceAdminHandlers();

  const memoizedServiceFilterFn = useCallback(serviceFilterFn, []);
  const { displayData: displayServices, handleSearch } = useFilteredData(services, memoizedServiceFilterFn);

  useEffect(() => {
    getServicesByType();
  }, [manageServiceOpen, editStatusOpen, editServiceOpen, editPaidOpen, getServicesByType]);

  const handleExport = () => {
    const rows = displayServices?.map((s) => ({
      car: s.car?.numberPlate || "",
      title: s.title,
      description: s.description,
      price: s.price,
      paid: s.paid ? "Paid" : "Unpaid",
      status: s.status,
    }));
    exportToCsv(rows, "services");
  };
  const trTh = (
    <tr>
      <th></th>
      <th>car</th>
      <th>title</th>
      <th>description</th>
      <th>price</th>
      <th>paid</th>
      <th>status</th>
    </tr>
  );

  const trTd = displayServices?.map((service) => {
    return (
      <tr key={service?._id}>
        <td data-label="Actions">
          <button
            name="manage"
            value={service?._id}
            onClick={handleServiceIdAction}
          >
            Manage
          </button>
        </td>
        <td data-label="Car">{service?.car?.numberPlate}</td>
        <td data-label="Title">{service?.title}</td>
        <td data-label="Description">{service?.description}</td>
        <td data-label="Price">{service?.price}</td>
        <td data-label="Payment Status">
          <button
            name="editPaid"
            value={service?._id}
            onClick={handleServiceIdAction}
            className={`editPaid ${service?.paid ? "Paid" : "Unpaid"}`}
          >
            {service?.paid ? "Paid" : "Unpaid"}
          </button>
        </td>
        <td data-label="Status">
          <button
            className={`status ${service?.status}`}
            name="editStatus"
            value={service?._id}
            onClick={handleServiceIdAction}
          >
            {service?.status}
          </button>
        </td>
      </tr>
    );
  });


  
  return (
    <div className="table-container">
      <Search handleSearch={handleSearch} name={"Services"} onExport={handleExport} />
      <Table trTh={trTh} trTd={trTd} />
    </div>
  );
}
