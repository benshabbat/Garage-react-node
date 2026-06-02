import Delete from "./Delete";
import { useCarsUIStore } from "../../stores/uiStores";
import { useCarHandlers } from "../../pages/cars/hooks/useCarHandlers";
const DeleteCar = () => {
  const selectedCar = useCarsUIStore((s) => s.selectedCar);
  const deleteCarOpen = useCarsUIStore((s) => s.deleteCarOpen);
  const toggleDeleteCar = useCarsUIStore((s) => s.toggleDeleteCar);
  const { useDeleteCar } = useCarHandlers();
  return (
    <Delete
      deleteData={selectedCar?.numberPlate}
      handle={toggleDeleteCar}
      nameData="deleteCar"
      isOpen={deleteCarOpen}
      handleDelete={useDeleteCar}
    />
  );
};

export default DeleteCar;
