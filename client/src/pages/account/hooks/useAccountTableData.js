import { useUserStore } from "../../../stores/userStore";
import { useAccountUIStore } from "../../../stores/uiStores";
import useFilteredData from "../../../hooks/useFilteredData";
import { carFilterFn } from "../../../utils/filterUtils";
import { handleCarAction as handleCarActionUtil } from "../utils/accountHandlerUtils";

export function useAccountTableData() {
  const user = useUserStore((s) => s.user);
  const { setSelectedCar, toggleReqService, toggleServices } = useAccountUIStore();

  const { displayData: displayCars, handleSearch } = useFilteredData(user?.cars, carFilterFn);

  const handleCar = (e) =>
    handleCarActionUtil(e, user?.cars, setSelectedCar, { toggleReqService, toggleServices });

  return { displayCars, handleSearch, handleCar };
}
