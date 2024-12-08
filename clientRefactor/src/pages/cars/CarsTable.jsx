import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useCarsContext } from "./CarsContext";

export default function CarsTable() {
  const { displayCars, handleCarAction, handleSearch } = useCarsContext();

  const trTh = (
    <tr>
      <th>Actions</th>
      <th>Management</th>
      <th>Owner</th>
      <th>License Plate</th>
      <th>Mileage</th>
      <th>Brand</th>
    </tr>
  );

  const trTd = displayCars?.map((car) => (
    <tr key={car?._id}>
      <td data-label="Actions">
        <button name="deleteCar" value={car?._id} onClick={handleCarAction}>
          Delete
        </button>
      </td>
      <td data-label="Management">
        <button value={car?._id} onClick={handleCarAction}>
          Manage
        </button>
      </td>
      <td data-label="Owner">{car?.owner?.username}</td>
      <td data-label="License Plate">{car?.numberPlate}</td>
      <td data-label="Mileage">{car?.km}</td>
      <td data-label="Brand">{car?.brand}</td>
    </tr>
  ));
  return (
    <div className="table-container">
      <Search handleSearch={handleSearch} name={"Cars"} />
      <Table trTh={trTh} trTd={trTd} />
    </div>
  );
}
