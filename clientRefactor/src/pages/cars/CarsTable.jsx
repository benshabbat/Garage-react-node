import { useCarsContext } from "./CarsContext";
export const CarsTable = () => {
  const { cars, filteredCars, handleCarAction } = useCarsContext();
  const displayCars = filteredCars || cars;

  return (
    <section className="table__body">
      <table>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Management</th>
            <th>Owner</th>
            <th>License Plate</th>
            <th>Mileage</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {displayCars?.map((car) => (
            <tr key={car?._id}>
              <td data-label="Actions">
                <button
                  name="deleteCar"
                  value={car?._id}
                  onClick={handleCarAction}
                >
                  Delete
                </button>
              </td>
              <td data-label="Management">
                <button value={car?._id} onClick={handleCarAction}>
                  Manage
                </button>
              </td>
              <td data-label="Owner">{car?.owner?.username}</td>
              <td data-label="License Plate">
                <button
                  name="createService"
                  value={car?._id}
                  onClick={handleCarAction}
                >
                  {car?.numberPlate}
                </button>
              </td>
              <td data-label="Mileage">
                <button
                  name="editCar"
                  value={car?._id}
                  onClick={handleCarAction}
                >
                  {car?.km}
                </button>
              </td>
              <td data-label="Brand">{car?.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
