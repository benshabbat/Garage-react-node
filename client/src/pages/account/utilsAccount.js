import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useOpenModel from "../../hooks/useOpenModel";
export function useAccount() {
  const { user } = useSelector((state) => state.user);
  const [car, setCar] = useState();
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
  function useFilterAccount() {
    const [filterCars, setFilterCars] = useState();

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

    const bodyAccountForTable = filterCars
      ? filterCars?.map((car) => bodyAcc(car, handelCar))
      : user?.cars?.map((car) => bodyAcc(car, handelCar));

    return { filterSearch, bodyAccountForTable };
  }

  return {
    useFilterAccount,
    car,
    isOpenReqService,
    handleReqService,
  };
}

const bodyAcc = (car, handelCar) => {
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
