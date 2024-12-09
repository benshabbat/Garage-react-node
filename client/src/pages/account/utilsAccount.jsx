import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useOpenModel from "../../hooks/useOpenModel";
export function useAccount() {
  const { user } = useSelector((state) => state.user);
  const [car, setCar] = useState();
  const [filterCars, setFilterCars] = useState();
  const [handleReqService, isOpenReqService] = useOpenModel();
  const navigate = useNavigate();

  const handelCar = (e) => {
    const { value, name } = e.target;
    console.log(e.target.value);
    if (name === "services") {
      onServices(value);
    }
    setCar(user?.cars.find((car) => car._id === value));
    handleReqService();
  };

  const onServices = (value) => {
    navigate(`/services/car/${value}`);
  };


  const filterSearch = (e) => {
    const { value } = e.target;
    setFilterCars(
      user?.cars?.filter(
        (item) =>
          item.numberPlate.includes(value) ||
          item.km.toString().includes(value) ||
          item.brand.includes(value)
      )
    );
  };

  const Search = () => {
    return (
      <section className="table__header">
        <h1>My Cars</h1>
        <div className="input-group">
          <input
            type="search"
            placeholder="Search Data..."
            onChange={filterSearch}
          />
        </div>
      </section>
    );
  };
  const bodyAcc = (car) => {
    return (
      <tr key={car._id}>
        <td>{car.brand}</td>
        <td>{car.numberPlate}</td>
        <td>{car.km}</td>
        <td>
          <button value={car._id} name={"services"} onClick={handelCar}>
            services
          </button>
        </td>
        <td>
          <button value={car._id} onClick={handelCar}>
            req services
          </button>
        </td>
      </tr>
    );
  };

  const TableAccount = () => {
    const bodyAccountForTable = filterCars
      ? filterCars?.map(bodyAcc)
      : user?.cars?.map(bodyAcc);

    return (
      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th>brand</th>
              <th>numberPlate</th>
              <th>km</th>
              <th>history service</th>
              <th>Request Service</th>
            </tr>
          </thead>
          <tbody>{bodyAccountForTable}</tbody>
        </table>
      </section>
    );
  };

  return {
    Search,
    filterSearch,
    TableAccount,
    car,
    isOpenReqService,
    handleReqService,
  };
}
