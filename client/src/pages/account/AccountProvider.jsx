import { useState, useEffect, useCallback } from "react";
import { AccountContext } from "./AccountContext";
import useFilteredData from "../../hooks/useFilteredData";
import { useUserStore } from "../../stores/userStore";
import PropTypes from "prop-types";
import { carFilterFn, serviceFilterFn } from "./utils/accountValidation";
import { handleCarAction as handleCarActionUtil } from "./utils/accountHandlerUtils";
import { useAccountModals } from "./hooks/useAccountModals";
import { useAccountHandlers } from "./hooks/useAccountHandlers";

export default function AccountProvider({ children }) {
  const user = useUserStore((s) => s.user);
  const services = useUserStore((s) => s.services);
  const getServicesByIdCar = useUserStore((s) => s.getServicesByIdCar);

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
    getServicesByIdCar(selectedCar?._id);
  }, [selectedCar, getServicesByIdCar]);
  
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
