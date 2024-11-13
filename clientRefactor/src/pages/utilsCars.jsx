import "../components/table/table.css";

import { useState, useEffect } from "react";
import useOpenModel from "../hooks/useOpenModel";

import { getCarsByType } from "../features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";

// import { BiSolidCarCrash, BiTrash } from "react-icons/bi";

import ManageCar from "../components/manage/ManageCar";
import EditCar from "../components/edit/EditCar";
import CreateService from "../components/create/CreateService";
import DeleteCar from "../components/delete/DeleteCar";


export function useCars() {
  const { user } = useSelector((state) => state.user);
  const { cars } = useSelector((state) => state.admin);
  const [car, setCar] = useState();
  const [handleManageCar, isOpenManageCar] = useOpenModel();
  const [filterCars, setFilterCars] = useState();
  const [handleEditCar, isOpenModelEditCar] = useOpenModel();
  const [handleCreateService, isOpenModelCreateService] = useOpenModel();
  const [handleDeleteCar, isOpenModelDeleteCar] = useOpenModel();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarsByType(user?._id));
  }, [isOpenManageCar, isOpenModelDeleteCar, isOpenModelEditCar]);

  const filterSearch = (e) => {
    const { value } = e.target;
    setFilterCars(
      cars.filter(
        (item) =>
          item.owner?.username.includes(value) ||
          item.numberPlate.includes(value) ||
          item.km.toString().includes(value) ||
          item.brand.includes(value)
      )
    );
  };

  function Search() {
    return (
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
    );
  }
  const handleCar = (e) => {
    const { name } = e.target;
    setCar(cars.find((car) => car._id === e.target.value));
    if (name === "editCar") {
      handleEditCar();
    } else if (name === "createService") {
      handleCreateService();
    } else if (name === "deleteCar") {
      handleDeleteCar();
    } else {
      handleManageCar();
    }
  };

  const bodyCars = (car) => {
    return (
      <tr key={car?._id}>
        <td>
          <button name="deleteCar" value={car?._id} onClick={handleCar}>
            {/* <BiTrash /> */}
            Delete
          </button>
        </td>
        <td>
          <button value={car?._id} onClick={handleCar}>
            Manage
          </button>
        </td>
        <td>{car?.owner?.username}</td>
        <td>
          <button name="createService" value={car?._id} onClick={handleCar}>
            {/* <BiSolidCarCrash />  */}
            {car?.numberPlate}
          </button>
        </td>
        <td>
          <button name="editCar" value={car?._id} onClick={handleCar}>
            {car?.km}
          </button>
        </td>
        <td>{car?.brand}</td>
      </tr>
    );
  };

  const TableCars = () => {
    return (
      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>owner</th>
              <th>numberPlate</th>
              <th>km</th>
              <th>brand</th>
            </tr>
          </thead>
          <tbody>
            {filterCars ? filterCars?.map(bodyCars) : cars?.map(bodyCars)}
          </tbody>
        </table>
      </section>
    );
  };
  function HandelCars() {
    return (
      <>
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
  }

  function PageCars() {
    return (
      <>
        <div className="table-container">
          {Search()}
          <TableCars />
        </div>
        <HandelCars />
      </>
    );
  }
  return {
    PageCars,
  };
}
