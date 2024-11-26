import "./manage.css";
import CreateService from "../create/CreateService";
import { deleteCar } from "../../utils";
import useOpenModel from "../../hooks/useOpenModel";
import { OpenModel, EditCar } from "../index";
import { useCarsContext } from "../../pages/cars/CarsContext";
//TODO: to use with context
const ManageCar = ({
  handelClick: handelClickManage = null,
  isOpen,
  car = null,
}) => {
 
  const [handleEditCar, isOpenModelEditCar] = useOpenModel();
  const [handleCreateService, isOpenModelCreateService] = useOpenModel();

  const handleCarAction = async (e) => {
    e.preventDefault();
    const { name } = e.target;

    switch (name) {
      case "createService":
        handleCreateService();
        break;
      case "editCar":
        handleEditCar();
        break;
      case "deleteCar":
        await deleteCar(car?._id, car?.owner._id.toString());
        handelClickManage();
        break;
      default:
        handelClickManage();
    }
  };
  return (
    <OpenModel
      comp={
        <>
          <form className="form">
            <button onClick={handelClickManage} className="form-close">
              X
            </button>
            <h1 className="header">Manage Admin</h1>
            <label className="form-label">
              <button
                name="createService"
                className="create"
                onClick={handleCarAction}
              >
                Create Service
              </button>
            </label>
            <label className="form-label">
              <button name="editCar" className="edit" onClick={handleCarAction}>
                Edit Car
              </button>
            </label>
            <label className="form-label">
              <button
                name="deleteCar"
                className="delete"
                onClick={handleCarAction}
              >
                Delete Car
              </button>
            </label>
          </form>
          <CreateService
            handelClick={handleCreateService}
            isOpen={isOpenModelCreateService}
          />
          <EditCar
            handelClick={handleEditCar}
            isOpen={isOpenModelEditCar}
          />
          
        </>
      }
      isOpen={isOpen}
    />
  );
};

export default ManageCar;
