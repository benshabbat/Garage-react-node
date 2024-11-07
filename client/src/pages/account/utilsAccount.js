import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useOpenModel from "../../hooks/useOpenModel";
export function useAccount() {
  const { user } = useSelector((state) => state.user);
  const [car, setCar] = useState();
  const [handleReqService, isOpenReqService] = useOpenModel();
  const [filterCars, setFilterCars] = useState();
  const navigate = useNavigate();

  const handelCar = (e) => {
    const { value } = e.target;
    console.log(e.target.value);
    setCar(user?.cars.find((c) => c._id === value));
    handleReqService();
  };

  const onServices = (e) => {
    const { value } = e.target;
    console.log(e.target.value);
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

  return {
    filterSearch,
    onServices,
    handelCar,
    car,
    isOpenReqService,
    filterCars,
    handleReqService,
    user,
  };
}

export const bodyAcc = (car, onServices, handelCar) => {
  return (
    <tr key={car._id}>
      <td>{car.brand}</td>
      <td>{car.numberPlate}</td>
      <td>{car.km}</td>
      <td>
        <button value={car._id} onClick={onServices}>
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
