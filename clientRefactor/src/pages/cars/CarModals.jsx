import ManageCar from "../../components/manage/ManageCar";
import EditCar from "../../components/edit/EditCar";
import CreateService from "../../components/create/CreateService";
import DeleteCar from "../../components/delete/DeleteCar";

export default function CarModals() {
  return (
    <>
      <ManageCar />
      <CreateService />
      <EditCar />
      <DeleteCar />
    </>
  );
}
