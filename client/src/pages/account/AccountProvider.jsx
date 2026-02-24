import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AccountContext } from "./AccountContext";
import useFilteredData from "../../hooks/useFilteredData";
import { getServicesByIdCar } from "../../features/user/userSlice";
import PropTypes from "prop-types";
import { carFilterFn, serviceFilterFn } from "./utils/accountValidation";
import { handleCarAction as handleCarActionUtil } from "./utils/accountHandlerUtils";
import { useAccountModals } from "./hooks/useAccountModals";
import { useAccountHandlers } from "./hooks/useAccountHandlers";

export default function AccountProvider({ children }) {
  const { user, services } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [selectedCar, setSelectedCar] = useState(null);

  // Modals management
  const modals = useAccountModals();

  // Filtering and search for cars
  const memoizedCarFilterFn = useCallback(carFilterFn, []);
  const { displayData: displayCars, handleSearch } = 
    useFilteredData(user?.cars, memoizedCarFilterFn);

  // Filtering and search for services
  const memoizedServiceFilterFn = useCallback(serviceFilterFn, []);
  const { displayData: displayServicesUser, handleSearch: handleSerchServicesUser } = 
    useFilteredData(services, memoizedServiceFilterFn);

  // Account handlers
  const accountHandlers = useAccountHandlers(selectedCar, user, modals);
  
  useEffect(() => {
    dispatch(getServicesByIdCar(selectedCar?._id));
  }, [selectedCar, dispatch]);
  
  const handleCar = (e) => {
    handleCarActionUtil(e, user?.cars, setSelectedCar, modals);
  };

  const value = {
    isOpenServices: modals.services.isOpen,
    handleSerchServicesUser,
    displayServicesUser,
    handleSearch,
    handleCar,
    isOpenReqService: modals.reqService.isOpen,
    handleReqService: modals.reqService.handle,
    displayCars,
    selectedCar,
    useReqService: accountHandlers.useReqService,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
