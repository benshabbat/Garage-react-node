import "./manage.css";
import CreateService from "../create/CreateService";
import { OpenModel, EditCar } from "../index";
import { useCarsContext } from "../../pages/cars/CarsContext";
//TODO: to use with context
const ManageCar = () => {
  const { handleCarAction, selectedCar, modals } = useCarsContext();

  return (
    <OpenModel
      comp={
        <>
          <form className="form">
            <button onClick={modals.manageCar.onClose} className="form-close">
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
          <CreateService
            handelClick={modals.createService.onClose}
            isOpen={modals.createService.isOpen}
          />
          <EditCar
            handelClick={modals.editCar.onClose}
            isOpen={modals.editCar.isOpen}
          />
        </>
      }
      isOpen={modals.manageCar.onClose}
    />
  );
};

export default ManageCar;
