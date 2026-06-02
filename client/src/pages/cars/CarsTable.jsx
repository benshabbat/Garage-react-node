import { useEffect, useCallback } from "react";
import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useAdminStore } from "../../stores/adminStore";
import { useUserStore } from "../../stores/userStore";
import { useCarsUIStore } from "../../stores/uiStores";
import { useCarAdminHandlers } from "./hooks/useCarAdminHandlers";
import useFilteredData from "../../hooks/useFilteredData";
import { carFilterFn } from "./utils/carValidation";

export default function CarsTable() {
  const user = useUserStore((s) => s.user);
  const cars = useAdminStore((s) => s.cars);
  const getCarsByType = useAdminStore((s) => s.getCarsByType);
  const { manageCarOpen, deleteCarOpen, editCarOpen } = useCarsUIStore();

  const memoizedCarFilterFn = useCallback(carFilterFn, []);
  const { displayData: displayCars, handleSearch, setFilteredData: setFilteredCars } =
    useFilteredData(cars, memoizedCarFilterFn);

  const { handleCar: handleCarAction } = useCarAdminHandlers(setFilteredCars);

  useEffect(() => {
    getCarsByType(user?._id);
  }, [manageCarOpen, deleteCarOpen, editCarOpen, getCarsByType, user?._id]);

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
        <button name="deleteCar"  value={car?._id} onClick={handleCarAction} >
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
