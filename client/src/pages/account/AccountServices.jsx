import { useCallback } from "react";
import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useAccountUIStore } from "../../stores/uiStores";
import { useUserStore } from "../../stores/userStore";
import useFilteredData from "../../hooks/useFilteredData";
import { serviceFilterFn } from "./utils/accountValidation";
export default function AccountServices() {
  const selectedCar = useAccountUIStore((s) => s.selectedCar);
  const services = useUserStore((s) => s.services);
  const memoizedServiceFilterFn = useCallback(serviceFilterFn, []);
  const { displayData: displayServicesUser, handleSearch: handleSerchServicesUser } = useFilteredData(services, memoizedServiceFilterFn);
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
