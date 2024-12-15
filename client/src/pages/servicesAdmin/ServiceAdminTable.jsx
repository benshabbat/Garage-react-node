import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useServicesAdminContext } from "./ServiceAdminContext";

export default function ServiceAdminTable() {
  const { displayServices, handleServiceIdAction, handleSearch } =
    useServicesAdminContext();
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
      <Search handleSearch={handleSearch} name={"Services"} />
      <Table trTh={trTh} trTd={trTd} />
    </div>
  );
}
