import "../../components/table/table.css";
import { CarsContext } from "./CarsContext";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createService, updateCar,deleteCar } from "../../utils";
import { getCarsByType } from "../../features/admin/adminSlice";
import useOpenModal from "../../hooks/useOpenModal";

export default function CarsProvider({ children }) {
  
  const { user } = useSelector((state) => state.user);
  const { cars } = useSelector((state) => state.admin);

  const [selectedCar, setSelectedCar] = useState(null);
  const [filteredCars, setFilteredCars] = useState(null);
  const [formData, setFormData] = useState();

  const [handleManageCar, isOpenManageCar] = useOpenModal();
  const [handleEditCar, isOpenModalEditCar] = useOpenModal();
  const [handleDeleteCar, isOpenModalDeleteCar] = useOpenModal();
  const [handleCreateService, isOpenModalCreateService] = useOpenModal();

  const displayCars = filteredCars || cars;

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

  const useCreateService = () => {
    const onSubmit = async (e) => {
      e.preventDefault();
      await createService(selectedCar?._id, formData);
      handleCreateService();
    };
    return { onSubmit, setFormData, formData };
  };

  const useEditCar = () => {
    useEffect(() => {
      setFormData(selectedCar);
    }, [selectedCar]);

    const onSubmit = async (e) => {
      e.preventDefault();
      await updateCar(selectedCar?._id, formData);
      handleEditCar();
    };
    return { onSubmit, setFormData, formData };
  };


  const useDeleteCar = async (e) => {
    e.preventDefault();
    const { name } = e.target;


    if (name === "deleteCar") {
      await deleteCar(selectedCar?._id, selectedCar?.owner._id.toString());
      handleDeleteCar();
    }
  };

  const options = [
    { value: "pending", label: "Pending" },
    { value: "done", label: "Done" },
    { value: "on-work", label: "On work" },
  ];

  const value = {
    useDeleteCar,
    useEditCar,
    useCreateService,
    options,
    cars,
    filteredCars,
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
