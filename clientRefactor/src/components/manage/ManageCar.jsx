import "./manage.css";
import CreateService from "../create/CreateService";
import { OpenModal, EditCar } from "../index";
import { useCarsContext } from "../../pages/cars/CarsContext";
const ManageCar = () => {

  //TODO: TO CREATE DELETE CAR COMPONENT
  const { handleCarAction, selectedCar, modals } = useCarsContext();

  return (
    <OpenModal
      comp={
        <>
          <form className="form">
            <button onClick={modals.manageCar.handle} className="form-close">
              X
            </button>
            <h1 className="header">Manage Admin</h1>
            <label className="form-label">
              <button
                value={selectedCar?._id}
                name="createService"
                className="create"
                onClick={handleCarAction}
              >
                Create Service
              </button>
            </label>
            <label className="form-label">
              <button
                value={selectedCar?._id}
                name="editCar"
                className="edit"
                onClick={handleCarAction}
              >
                Edit Car
              </button>
            </label>
            <label className="form-label">
              <button
                value={selectedCar?._id}
                name="deleteCar"
                className="delete"
                onClick={handleCarAction}
              >
                Delete Car
              </button>
            </label>
          </form>
          <CreateService />
          <EditCar />
        </>
      }
      isOpen={modals.manageCar.isOpen}
    />
  );
};

export default ManageCar;
