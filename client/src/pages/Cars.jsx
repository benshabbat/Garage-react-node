import "../components/table/table.css";

import ManageCar from "../components/manage/ManageCar";

import EditCar from "../components/edit/EditCar";
import CreateService from "../components/create/CreateService";

import DeleteCar from "../components/delete/DeleteCar";
import { useCars } from "./utilsCars";

//TODO: to move logic to external file
const Cars = () => {
  const {
    car,
    TableCars,

    filterSearch,

    handleEditCar,
    isOpenModelEditCar,
    handleCreateService,
    isOpenModelCreateService,

    handleDeleteCar,
    isOpenModelDeleteCar,
    handleManageCar,
    isOpenManageCar,
  } = useCars();
  return (
    <>
      <div className="table-container">
        <section className="table__header">
          <h1>Cars</h1>
          <div className="input-group">
            <input
              type="search"
              placeholder="Search Data..."
              onChange={filterSearch}
            />
          </div>
        </section>
        <TableCars />
      </div>
      <ManageCar
        car={car}
        handelClick={handleManageCar}
        isOpen={isOpenManageCar}
      />
      <CreateService
        car={car}
        handelClick={handleCreateService}
        isOpen={isOpenModelCreateService}
      />
      <EditCar
        car={car}
        handelClick={handleEditCar}
        isOpen={isOpenModelEditCar}
      />
      <DeleteCar
        car={car}
        handelClick={handleDeleteCar}
        isOpen={isOpenModelDeleteCar}
      />
    </>
  );
};

export default Cars;
