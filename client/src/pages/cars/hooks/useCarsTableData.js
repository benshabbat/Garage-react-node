import { useEffect, useCallback } from "react";
import { useAdminStore } from "../../../stores/adminStore";
import { useUserStore } from "../../../stores/userStore";
import { useCarsUIStore } from "../../../stores/uiStores";
import { useCarAdminHandlers } from "./useCarAdminHandlers";
import useFilteredData from "../../../hooks/useFilteredData";
import { carFilterFn } from "../utils/carValidation";

export function useCarsTableData() {
  const user = useUserStore((s) => s.user);
  const cars = useAdminStore((s) => s.cars);
  const getCarsByType = useAdminStore((s) => s.getCarsByType);
  const { manageCarOpen, deleteCarOpen, editCarOpen } = useCarsUIStore();

  const memoizedCarFilterFn = useCallback(carFilterFn, []);
  const {
    displayData: displayCars,
    handleSearch,
    setFilteredData: setFilteredCars,
  } = useFilteredData(cars, memoizedCarFilterFn);

  const { handleCar: handleCarAction } = useCarAdminHandlers(setFilteredCars);

  useEffect(() => {
    getCarsByType(user?._id);
  }, [manageCarOpen, deleteCarOpen, editCarOpen, getCarsByType, user?._id]);

  return { displayCars, handleSearch, handleCarAction };
}
