import "./manage.css";
import CreateService from "../create/CreateService";
import { OpenModal, EditCar } from "../index";
import { useCarsContext } from "../../pages/cars/CarsContext";
import ButtonManage from "./ButtonManage";
import FormManage from "./FormManage";

const ManageCar = () => {
  const { handleCarAction, selectedCar, modals } = useCarsContext();

  return (
    <OpenModal
      comp={
        <>
          <FormManage handle={modals.manageCar.handle}>
            <ButtonManage
              name="createService"
              type="create"
              handle={handleCarAction}
              value={selectedCar?._id}
              content="Create Service"
            />
            <ButtonManage
              name="editCar"
              type="edit"
              handle={handleCarAction}
              value={selectedCar?._id}
              content="Edit Car"
            />
            <ButtonManage
              name="deleteCar"
              type="delete"
              handle={handleCarAction}
              value={selectedCar?._id}
              content="Delete Car"
            />
          </FormManage>
          <CreateService />
          <EditCar />
        </>
      }
      isOpen={modals.manageCar.isOpen}
    />
  );
};

export default ManageCar;
