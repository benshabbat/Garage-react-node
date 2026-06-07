import { useAccountUIStore } from "../../../stores/uiStores";
import { useUserStore } from "../../../stores/userStore";
import useFilteredData from "../../../hooks/useFilteredData";
import { serviceFilterFn } from "../utils/accountValidation";

export function useAccountServicesData() {
  const selectedCar = useAccountUIStore((s) => s.selectedCar);
  const services = useUserStore((s) => s.services);
  const { displayData: displayServices, handleSearch } = useFilteredData(services, serviceFilterFn);

  return { selectedCar, displayServices, handleSearch };
}
