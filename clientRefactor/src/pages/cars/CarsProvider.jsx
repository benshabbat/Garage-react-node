import "../../components/table/table.css";
import {CarsContext} from "./CarsContext"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarsByType } from "../../features/admin/adminSlice";
import useOpenModel from "../../hooks/useOpenModel";

export default function CarsProvider ({ children }) {
  const { user } = useSelector((state) => state.user);
  const { cars } = useSelector((state) => state.admin);
  
  const [selectedCar, setSelectedCar] = useState(null);
  const [filteredCars, setFilteredCars] = useState(null);
  
  const [handleManageCar, isOpenManageCar] = useOpenModel();
  const [handleEditCar, isOpenModelEditCar] = useOpenModel();
  const [handleCreateService, isOpenModelCreateService] = useOpenModel();
  const [handleDeleteCar, isOpenModelDeleteCar] = useOpenModel();
  
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getCarsByType(user?._id));
    }, [isOpenManageCar, isOpenModelDeleteCar, isOpenModelEditCar, dispatch, user?._id]);
  
    const handleCarAction = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      const car = cars.find((car) => car._id === value);
      setSelectedCar(car);
  
      switch (name) {
        case "editCar":
          handleEditCar();
          break;
        case "createService":
          handleCreateService();
          break;
        case "deleteCar":
          handleDeleteCar();
          break;
        default:
          handleManageCar();
      }
    };
  
    const handleSearch = (e) => {
      const { value } = e.target;
      setFilteredCars(
        value 
          ? cars.filter(
              (item) =>
                item.owner?.username.includes(value) ||
                item.numberPlate.includes(value) ||
                item.km.toString().includes(value) ||
                item.brand.includes(value)
            )
          : null
      );
    };
  
    const value = {
      cars,
      filteredCars,
      selectedCar,
      handleCarAction,
      handleSearch,
      modals: {
        manageCar: { isOpen: isOpenManageCar, onClose: handleManageCar },
        editCar: { isOpen: isOpenModelEditCar, onClose: handleEditCar },
        createService: { isOpen: isOpenModelCreateService, onClose: handleCreateService },
        deleteCar: { isOpen: isOpenModelDeleteCar, onClose: handleDeleteCar },
      }
    };
  
    return <CarsContext.Provider value={value}>{children}</CarsContext.Provider>;
  };