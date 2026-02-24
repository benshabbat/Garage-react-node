import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AccountContext } from "./AccountContext";
import useOpenModal from "../../hooks/useOpenModal";
import useFilteredData from "../../hooks/useFilteredData";
import { getServicesByIdCar } from "../../features/user/userSlice";
import PropTypes from "prop-types";
import { carFilterFn, serviceFilterFn } from "./utils/accountValidation";
import { useServiceRequestForm } from "./hooks/useServiceRequestForm";
import { useAccountActions } from "./hooks/useAccountActions";
export default function AccountProvider({ children }) {
  const { user, services } = useSelector((state) => state.user);
  const [selectedCar, setSelectedCar] = useState(null);

  // Modals
  const [handleReqService, isOpenReqService] = useOpenModal();
  const [handleServices, isOpenServices] = useOpenModal();

  // Filtering and search for cars
  const memoizedCarFilterFn = useCallback(carFilterFn, []);
  const { displayData: displayCars, handleSearch } = 
    useFilteredData(user?.cars, memoizedCarFilterFn);

  // Filtering and search for services
  const memoizedServiceFilterFn = useCallback(serviceFilterFn, []);
  const { displayData: displayServicesUser, handleSearch: handleSerchServicesUser } = 
    useFilteredData(services, memoizedServiceFilterFn);

  // Account actions
  const accountActions = useAccountActions(selectedCar, user);


  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getServicesByIdCar(selectedCar?._id));
  }, [selectedCar, dispatch]);
  
  const handleCar = (e) => {
    const { value, name } = e.target;
    setSelectedCar(user?.cars.find((car) => car._id === value));
    if (name === "req-services") {
      handleReqService();
    }
    if (name === "services") {
      handleServices();
    }
  };

  // Hook for requesting service
  function useReqService() {
    const requestForm = useServiceRequestForm();
    
    const onSubmit = (e) => {
      accountActions.onSubmitReqService(e, requestForm.formData, handleReqService);
    };
    
    return { 
      setFormData: requestForm.setFormData, 
      onSubmit 
    };
  }

  const value = {
    isOpenServices,
    handleSerchServicesUser,
    displayServicesUser,
    handleSearch,
    handleCar,
    isOpenReqService,
    handleReqService,
    displayCars,
    selectedCar,
    useReqService,
  };
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
