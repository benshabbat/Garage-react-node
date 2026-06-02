import { useAdminStore } from "../../../stores/adminStore";
import { useCarsUIStore } from "../../../stores/uiStores";
import { useCarHandlers } from "./useCarHandlers";
import { handleCarAction } from "../utils/carHandlerUtils";

export const useCarAdminHandlers = (setFilteredCars) => {
  const cars = useAdminStore((s) => s.cars);
  const { setSelectedCar, toggleManageCar, toggleEditCar, toggleCreateService, toggleDeleteCar } =
    useCarsUIStore();
  const carHandlers = useCarHandlers(setFilteredCars);

  const handleCar = (e) => {
    handleCarAction(e, cars, setSelectedCar, {
      toggleManageCar,
      toggleEditCar,
      toggleCreateService,
      toggleDeleteCar,
    });
  };

  return { handleCar, ...carHandlers };
};
