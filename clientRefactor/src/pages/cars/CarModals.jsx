import ManageCar from "../../components/manage/ManageCar";
import EditCar from "../../components/edit/EditCar";
import CreateService from "../../components/create/CreateService";
import DeleteCar from "../../components/delete/DeleteCar";
import { useCarsContext } from "./CarsContext";
//TODO: i dont need this props i can using with context
export default function CarModals() {
  const { modals } = useCarsContext();
  return (
    <>
      <ManageCar
      />
      <CreateService
        handelClick={modals.createService.onClose}
        isOpen={modals.createService.isOpen}
      />
      <EditCar
        handelClick={modals.editCar.onClose}
        isOpen={modals.editCar.isOpen}
      />
      <DeleteCar
        handelClick={modals.deleteCar.onClose}
        isOpen={modals.deleteCar.isOpen}
      />
    </>
  );
}
