import ManageCar from "../../components/manage/ManageCar";
import EditCar from "../../components/edit/EditCar";
import CreateService from "../../components/create/CreateService";
import DeleteCar from "../../components/delete/DeleteCar";

export default function CarModals() {
  return (
    <>
    <ManageCar
      car={selectedCar}
      handelClick={handleManageCar}
      isOpen={isOpenManageCar}
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
