import { useAccountTableData } from "./useAccountTableData";

export function useAccountTableRows() {
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

  const trTd = displayCars?.map((car) => (
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
  ));

  return { trTh, trTd, handleSearch };
}
