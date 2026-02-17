import { useState,useEffect, useCallback } from "react";
import { useSelector,useDispatch } from "react-redux";
import { AccountContext } from "./AccountContext";
import { createReqService } from "../../utils";
import useOpenModal from "../../hooks/useOpenModal";
import useFilteredData from "../../hooks/useFilteredData";
import { getServicesByIdCar } from "../../features/user/userSlice";
import PropTypes from "prop-types";
export default function AccountProvider({ children }) {
  const { user, services } = useSelector((state) => state.user);

  const [selectedCar, setSelectedCar] = useState(null);

  const [handleReqService, isOpenReqService] = useOpenModal();
  const [handleServices, isOpenServices] = useOpenModal();

  // Use generic filtering hook for cars
  const carFilterFn = useCallback((item, value) =>
    item.numberPlate.includes(value) ||
    item.km.toString().includes(value) ||
    item.brand.includes(value),
    []
  );
  
  const { displayData: displayCars, handleSearch } = 
    useFilteredData(user?.cars, carFilterFn);

  // Use generic filtering hook for services
  const serviceFilterFn = useCallback((service, value) =>
    service?.title.includes(value) ||
    service?.description.includes(value) ||
    service?.price.toString().includes(value) ||
    service?.paid.toString().includes(value) ||
    service?.status.includes(value),
    []
  );
  
  const { displayData: displayServicesUser, handleSearch: handleSerchServicesUser } = 
    useFilteredData(services, serviceFilterFn);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServicesByIdCar(selectedCar?._id));
  }, [selectedCar, dispatch]);
  const handleCar = (e) => {
    const { value, name } = e.target;
    console.log(e.target.value);
    setSelectedCar(user?.cars.find((car) => car._id === value));
    if (name === "req-services") {
      handleReqService();
    }
    if (name === "services") {
      handleServices();
    }
  };

  
  function useReqService() {
    const [formData, setFormData] = useState();
    const onSubmit = async (e) => {
      e.preventDefault();
      setFormData((prevState) => ({
        ...prevState,
        title: selectedCar?.numberPlate.toString(),
        from: user?._id,
      }));
      await createReqService(formData);
      handleReqService();
    };
    return { setFormData, onSubmit };
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
