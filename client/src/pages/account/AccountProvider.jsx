import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AccountContext } from "./AccountContext"
import { createReqService } from "../../utils";
import useOpenModal from "../../hooks/useOpenModal";

export default function AccountProvider({children}) {

    const { user } = useSelector((state) => state.user);
    const [selectedCar, setSelectedCar] = useState(null);
    const [filteredCars, setFilteredCars] = useState(null);
    const [handleReqService, isOpenReqService] = useOpenModal();
    const navigate = useNavigate();

    const displayCars = filteredCars ||user?.cars
  
    const handleCar = (e) => {
      const { value, name } = e.target;
      console.log(e.target.value);
      if (name === "services") {
        onServices(value);
      }
      setSelectedCar(user?.cars.find((car) => car._id === value));
      handleReqService();
    };
  
    const onServices = (value) => {
      navigate(`/services/car/${value}`);
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
        return { setFormData,onSubmit};
      }

    
const value={handleSearch,handleCar,isOpenReqService,handleReqService,displayCars,selectedCar,useReqService}
return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}
