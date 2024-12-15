import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useAccountContext } from "./AccountContext";
export default function AccountServices() {
  const { displayServicesUser, handleSerchServicesUser,selectedCar } = useAccountContext();
  const trTh = (
    <tr>
      <th>title</th>
      <th>description</th>
      <th>price</th>
      <th>paid</th>
      <th>status</th>
    </tr>
  );

  const trTd = displayServicesUser?.map((service) => {
    return (
      <tr key={service?._id}>
        <td>{service?.title}</td>
        <td>{service?.description}</td>
        <td>{service?.price}</td>
        <td data-label="Payment Status">{service?.paid ? "Paid" : "Unpaid"}</td>
        <td>
          <div className={`status ${service?.status}`}>{service?.status}</div>
        </td>
      </tr>
    )
  });

  return (
    <div className="table-container">
        <Search handleSearch={handleSerchServicesUser} name={`My Services of Car ${selectedCar?.numberPlate}`} />
      <Table trTh={trTh} trTd={trTd} />
    </div>
  );
}
