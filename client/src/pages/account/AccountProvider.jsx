import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { AccountContext } from "./AccountContext";
import { createReqService } from "../../utils";
import useOpenModal from "../../hooks/useOpenModal";
import { getServicesByIdCar } from "../../features/user/userSlice";
export default function AccountProvider({ children }) {
  const { user, services } = useSelector((state) => state.user);

  const [selectedCar, setSelectedCar] = useState(null);
  const [filteredCars, setFilteredCars] = useState(null);
  const [filteredServices, setFilteredServices] = useState(null);

  const [handleReqService, isOpenReqService] = useOpenModal();
  const [handleServices, isOpenServices] = useOpenModal();

  const displayServicesUser = filteredServices || services;
  const displayCars = filteredCars || user?.cars;


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


  const handleSearch = (e) => {
    const { value } = e.target;
    setFilteredCars(
      user?.cars?.filter(
        (item) =>
          item.numberPlate.includes(value) ||
          item.km.toString().includes(value) ||
          item.brand.includes(value)
      )
    );
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

  const handleSerchServicesUser = (e) => {
    const { value } = e.target;
    setFilteredServices(
      services.filter(
        (service) =>
          service?.title.includes(value) ||
          service?.description.includes(value) ||
          service?.price.toString().includes(value) ||
          service?.paid.toString().includes(value) ||
          service?.status.includes(value)
      )
    );
  };

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
