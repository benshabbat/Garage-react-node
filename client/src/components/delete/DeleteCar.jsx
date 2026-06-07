import DeleteModal from "./DeleteModal";
import { useCarsUIStore } from "../../stores/uiStores";
import { useCarHandlers } from "../../pages/cars/hooks/useCarHandlers";

const DeleteCar = () => (
  <DeleteModal
    useStore={useCarsUIStore}
    selectedKey="selectedCar"
    isOpenKey="deleteCarOpen"
    toggleKey="toggleDeleteCar"
    useHandlers={useCarHandlers}
    handlerKey="useDeleteCar"
    displayField="numberPlate"
    nameData="deleteCar"
  />
);

export default DeleteCar;
