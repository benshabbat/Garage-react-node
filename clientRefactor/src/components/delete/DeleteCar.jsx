import { OpenModal } from "../index";
import { useCarsContext } from "../../pages/cars/CarsContext";
const DeleteCar = () => {
  const { useDeleteCar, modals, selectedCar } = useCarsContext();
  return (
    <OpenModal
      comp={
        <>
          <form className="form">
            <button onClick={modals.deleteCar.handle} className="form-close">
              X
            </button>
            <h1 className="header">Delete Car</h1>
            <h2>{`Are you sure to delete the car? :${selectedCar?.numberPlate}`}</h2>
            <label className="form-label">
              <button
                name="deleteCar"
                className="delete"
                onClick={useDeleteCar}
              >
                Yes
              </button>
            </label>
            <label className="form-label">
              <button name="noDelete" className="create" onClick={useDeleteCar}>
                No
              </button>
            </label>
          </form>
        </>
      }
      isOpen={modals.deleteCar.isOpen}
    />
  );
};

export default DeleteCar;
