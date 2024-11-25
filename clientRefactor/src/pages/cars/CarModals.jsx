import ManageCar from "../../components/manage/ManageCar";
import EditCar from "../../components/edit/EditCar";
import CreateService from "../../components/create/CreateService";
import DeleteCar from "../../components/delete/DeleteCar";
import { useCarsContext } from "./CarsContext";


//TODO:NEED TO CREATE GET DATA FROM USECONTEXT CAR
export default function CarModals() {
    const {modals,selectedCar} = useCarsContext()
  return (
    <>
    <ManageCar
      car={selectedCar}
      handelClick={modals.manageCar.onClose}
      isOpen={modals.manageCar.isOpen}
    />
    <CreateService
      car={selectedCar}
      handelClick={handleCreateService}
      isOpen={isOpenModelCreateService}
    />
    <EditCar
      car={selectedCar}
      handelClick={handleEditCar}
      isOpen={isOpenModelEditCar}
    />
    <DeleteCar
      car={selectedCar}
      handelClick={handleDeleteCar}
      isOpen={isOpenModelDeleteCar}
    />
  </>
  )
}
