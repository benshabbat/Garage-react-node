import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useAccountTableData } from "./hooks/useAccountTableData";

export default function AccountTable() {
  const { displayCars, handleSearch, handleCar } = useAccountTableData();
  const trTh = (
    <tr>
      <th>Brand</th>
      <th>License Plate</th>
      <th>Mileage (km)</th>
      <th>Service History</th>
      <th>Request Service</th>
    </tr>
  );
  const trTd = displayCars?.map((car) => {
    return (
      <tr key={car._id}>
        <td>{car.brand}</td>
        <td>{car.numberPlate}</td>
        <td>{car.km}</td>
        <td>
          <button value={car._id} name="services" onClick={handleCar}>
            View Services
          </button>
        </td>
        <td>
          <button value={car._id} name="req-services" onClick={handleCar}>
            Request Service
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div className="table-container">
      <Search handleSearch={handleSearch} name={"My Cars"} />
      <Table trTh={trTh} trTd={trTd} />
    </div>
  );
}
