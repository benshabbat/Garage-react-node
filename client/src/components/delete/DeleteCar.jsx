import { useCarsContext } from "../../pages/cars/CarsContext";
import Delete from "./Delete";
const DeleteCar = () => {
  const { useDeleteCar, modals, selectedCar } = useCarsContext();
  return (
    <Delete
      deleteData={selectedCar?.numberPlate}
      handle={modals.deleteCar.handle}
      nameData="deleteCar"
      isOpen={modals.deleteCar.isOpen}
      handleDelete={useDeleteCar}
    />
  );
};

export default DeleteCar;
