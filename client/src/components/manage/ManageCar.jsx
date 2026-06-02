import "./manage.css";
import CreateService from "../create/CreateService";
import { OpenModal, EditCar } from "../index";
import { useCarsUIStore } from "../../stores/uiStores";
import { useCarAdminHandlers } from "../../pages/cars/hooks/useCarAdminHandlers";
import ButtonManage from "./ButtonManage";
import FormManage from "./FormManage";

const MANAGE_CAR_BUTTONS = [
  { name: "createService", type: "create", content: "Create Service" },
  { name: "editCar",       type: "edit",   content: "Edit Car"       },
  { name: "deleteCar",     type: "delete", content: "Delete Car"     },
];

const ManageCar = () => {
  const selectedCar = useCarsUIStore((s) => s.selectedCar);
  const manageCarOpen = useCarsUIStore((s) => s.manageCarOpen);
  const toggleManageCar = useCarsUIStore((s) => s.toggleManageCar);
  const { handleCar } = useCarAdminHandlers();

  return (
    <OpenModal
      comp={
        <>
          <FormManage handle={toggleManageCar}>
            {MANAGE_CAR_BUTTONS.map(({ name, type, content }) => (
              <ButtonManage
                key={name}
                name={name}
                type={type}
                handle={handleCar}
                value={selectedCar?._id}
                content={content}
              />
            ))}
          </FormManage>
          <CreateService />
          <EditCar />
        </>
      }
      isOpen={manageCarOpen}
    />
  );
};

export default ManageCar;
