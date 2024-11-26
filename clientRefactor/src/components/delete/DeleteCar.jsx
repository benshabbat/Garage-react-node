import { OpenModel } from "../index";
import { deleteCar } from "../../utils";
import { useCarsContext } from "../../pages/cars/CarsContext";

// import CancelIcon from "@mui/icons-material/Cancel";
const DeleteCar = ({
  handelClick: handelClickManage = null,
  isOpen,
}) => {
  const {selectedCar} = useCarsContext()
  const handleCar = async (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "noDelete") handelClickManage();

    if (name === "deleteCar") {
      await deleteCar(selectedCar?._id, selectedCar?.owner._id.toString());
      handelClickManage();
    }
  };

  return (
    <OpenModel
      comp={
        <>
          <form className="form">
            <button onClick={handelClickManage} className="form-close" >X</button>
            <h1 className="header">Manage Admin</h1>
            <h2>{`Hello ${selectedCar?.owner?.username}`}</h2>
            <label className="form-label">
              <button name="deleteCar" className="delete" onClick={handleCar}>
                Yes
              </button>
            </label>
            <label className="form-label">
              <button name="noDelete" className="create" onClick={handleCar}>
                No
              </button>
            </label>
          </form>
        </>
      }
      isOpen={isOpen}
    />
  );
};

export default DeleteCar;
