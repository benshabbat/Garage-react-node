import "./manage.css";
import CreateService from "../create/CreateService";
import { OpenModal, EditCar } from "../index";
import { useCarsContext } from "../../pages/cars/CarsContext";
import ButtonManage from "./ButtonManage";
import FormManage from "./FormManage";

const MANAGE_CAR_BUTTONS = [
  { name: "createService", type: "create", content: "Create Service" },
  { name: "editCar",       type: "edit",   content: "Edit Car"       },
  { name: "deleteCar",     type: "delete", content: "Delete Car"     },
];

const ManageCar = () => {
  const { handleCarAction, selectedCar, modals } = useCarsContext();

  return (
    <OpenModal
      comp={
        <>
          <FormManage handle={modals.manageCar.handle}>
            {MANAGE_CAR_BUTTONS.map(({ name, type, content }) => (
              <ButtonManage
                key={name}
                name={name}
                type={type}
                handle={handleCarAction}
                value={selectedCar?._id}
                content={content}
              />
            ))}
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
