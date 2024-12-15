import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useAccountContext } from "./AccountContext";

export default function AccountTable() {
  const { handleCar, displayCars, handleSearch } = useAccountContext();
  const trTh = (
    <tr>
      <th>brand</th>
      <th>numberPlate</th>
      <th>km</th>
      <th>history service</th>
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
          <button value={car._id} name={"services"}  onClick={handleCar}>
            services
          </button>
        </td>
        <td>
          <button value={car._id}name={"req-services"} onClick={handleCar}>
            req services
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
