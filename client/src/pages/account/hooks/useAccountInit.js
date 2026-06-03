import { useEffect } from "react";
import { useAccountUIStore } from "../../../stores/uiStores";
import { useUserStore } from "../../../stores/userStore";

export function useAccountInit() {
  const selectedCar = useAccountUIStore((s) => s.selectedCar);
  const getServicesByIdCar = useUserStore((s) => s.getServicesByIdCar);

  useEffect(() => {
    getServicesByIdCar(selectedCar?._id);
  }, [selectedCar, getServicesByIdCar]);
}
