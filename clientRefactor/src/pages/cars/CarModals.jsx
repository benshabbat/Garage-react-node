import ManageCar from "../../components/manage/ManageCar";
import DeleteCar from "../../components/delete/DeleteCar";
import { useCarsContext } from "./CarsContext";

export default function CarModals() {
    const {modals,selectedCar} = useCarsContext()
  return (
    <>
    <ManageCar
      car={selectedCar}
      handelClick={modals.manageCar.onClose}
      isOpen={modals.manageCar.isOpen}
    />
    {/* <CreateService
      car={selectedCar}
      handelClick={modals.createService.onClose}
      isOpen={modals.createService.isOpen}
    />
    <EditCar
      car={selectedCar}
      handelClick={modals.editCar.onClose}
      isOpen={modals.editCar.isOpen}
    /> */}
    <DeleteCar
      car={selectedCar}
      handelClick={modals.deleteCar.onClose}
      isOpen={modals.deleteCar.isOpen}
    />
  </>
  )
}
