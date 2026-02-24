import { CarsContext } from "./CarsContext";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarsByType } from "../../features/admin/adminSlice";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
import { carFilterFn, serviceStatusOptions } from "./utils/carValidation";
import { handleCarAction as handleCarActionUtil } from "./utils/carHandlerUtils";
import { useCarModals } from "./hooks/useCarModals";
import { useCarHandlers } from "./hooks/useCarHandlers";

export default function CarsProvider({ children }) {
  const { user } = useSelector((state) => state.user);
  const { cars } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [selectedCar, setSelectedCar] = useState();

  // Modals management
  const modals = useCarModals();

  // Filtering and search
  const memoizedCarFilterFn = useCallback(carFilterFn, []);
  const { displayData: displayCars, handleSearch, setFilteredData: setFilteredCars } = 
    useFilteredData(cars, memoizedCarFilterFn);

  // Car handlers
  const carHandlers = useCarHandlers(selectedCar, setFilteredCars, modals);

  useEffect(() => {
    dispatch(getCarsByType(user?._id));
  }, [
    modals.manageCar.isOpen,
    modals.deleteCar.isOpen,
    modals.editCar.isOpen,
    dispatch,
    user?._id,
  ]);

  const handleCarAction = (e) => {
    handleCarActionUtil(e, cars, setSelectedCar, modals);
  };

  const value = {
    useDeleteCar: carHandlers.useDeleteCar,
    useEditCar: carHandlers.useEditCar,
    useCreateService: carHandlers.useCreateService,
    options: serviceStatusOptions,
    cars,
    selectedCar,
    handleCarAction,
    handleSearch,
    displayCars,
    modals,
  };

  return <CarsContext.Provider value={value}>{children}</CarsContext.Provider>;
}

CarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
