import { CarsContext } from "./CarsContext";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarsByType } from "../../features/admin/adminSlice";
import useOpenModal from "../../hooks/useOpenModal";
import useFilteredData from "../../hooks/useFilteredData";
import PropTypes from "prop-types";
import { carFilterFn, serviceStatusOptions } from "./utils/carValidation";
import { useCarForm } from "./hooks/useCarForm";
import { useCarActions } from "./hooks/useCarActions";

export default function CarsProvider({ children }) {
  const { user } = useSelector((state) => state.user);
  const { cars } = useSelector((state) => state.admin);

  const [selectedCar, setSelectedCar] = useState();

  // Modals
  const [handleManageCar, isOpenManageCar] = useOpenModal();
  const [handleEditCar, isOpenModalEditCar] = useOpenModal();
  const [handleDeleteCar, isOpenModalDeleteCar] = useOpenModal();
  const [handleCreateService, isOpenModalCreateService] = useOpenModal();

  // Filtering and search
  const memoizedCarFilterFn = useCallback(carFilterFn, []);
  const { displayData: displayCars, handleSearch, setFilteredData: setFilteredCars } = 
    useFilteredData(cars, memoizedCarFilterFn);

  // Form management
  const serviceForm = useCarForm(null);
  
  // Car actions
  const carActions = useCarActions(selectedCar, setFilteredCars);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarsByType(user?._id));
  }, [
    isOpenManageCar,
    isOpenModalDeleteCar,
    isOpenModalEditCar,
    dispatch,
    user?._id,
  ]);

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

  // Hook for creating service
  const useCreateService = () => {
    const onSubmit = (e) => {
      carActions.onSubmitCreateService(e, serviceForm.formData, handleCreateService);
    };
    return { 
      onSubmit, 
      setFormData: serviceForm.setFormData, 
      formData: serviceForm.formData 
    };
  };

  // Hook for editing car
  const useEditCar = () => {
    const editCarForm = useCarForm(selectedCar);

    const onSubmit = (e) => {
      carActions.onSubmitEditCar(e, editCarForm.formData, handleEditCar);
    };
    
    return { 
      onSubmit, 
      setFormData: editCarForm.setFormData, 
      formData: editCarForm.formData
    };
  };

  // Delete car handler
  const useDeleteCar = (e) => {
    carActions.onSubmitDeleteCar(e, handleDeleteCar);
  };

  const value = {
    useDeleteCar,
    useEditCar,
    useCreateService,
    options: serviceStatusOptions,
    cars,
    selectedCar,
    handleCarAction,
    handleSearch,
    displayCars,
    modals: {
      manageCar: { isOpen: isOpenManageCar, handle: handleManageCar },
      editCar: { isOpen: isOpenModalEditCar, handle: handleEditCar },
      createService: {
        isOpen: isOpenModalCreateService,
        handle: handleCreateService,
      },
      deleteCar: { isOpen: isOpenModalDeleteCar, handle: handleDeleteCar },
    },
  };

  return <CarsContext.Provider value={value}>{children}</CarsContext.Provider>;
}

CarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
