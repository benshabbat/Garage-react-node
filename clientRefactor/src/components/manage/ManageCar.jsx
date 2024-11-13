import "./manage.css";
import CreateService from "../create/CreateService";
import { deleteCar } from "../../utils";
import useOpenModel from "../../hooks/useOpenModel";
import { OpenModel, EditCar } from "../index";
// import {BsPencilSquare} from "react-icons/bs"
const ManageCar = ({
  handelClick: handelClickManage = null,
  isOpen,
  car = null,
}) => {
  const [handleEditCar, isOpenModelEditCar] = useOpenModel();
  const [handleCreateService, isOpenModelCreateService] = useOpenModel();

  const handleCar = async (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "createService") handleCreateService();

    if (name === "deleteCar") {
      await deleteCar(car?._id, car?.owner._id.toString());
      handelClickManage();
      // dispatch(getCars());
    }
    if (name === "editCar") {
      handleEditCar();
      // dispatch(getCars());
    }
  };

  return (
    <OpenModel
      comp={
        <>
          <form className="form">
            <button onClick={handelClickManage} className="form-close" >X</button>
            <h1 className="header">Manage Admin</h1>
            <h2>{`Hello ${car?.owner?.username}`}</h2>
            <label className="form-label">
              <button
                name="createService"
                className="create"
                onClick={handleCar}
              >
                Create Service
              </button>
            </label>
            <label className="form-label">
              <button name="editCar" className="edit" onClick={handleCar}>
                {/* <BsPencilSquare/> */}
                Edit Car
              </button>
            </label>
            <label className="form-label">
              <button name="deleteCar" className="delete" onClick={handleCar}>
                Delete Car
              </button>
            </label>
          </form>
          <CreateService
            car={car}
            handelClick={handleCreateService}
            isOpen={isOpenModelCreateService}
          />
          <EditCar
            car={car}
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
