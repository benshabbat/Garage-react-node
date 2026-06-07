import "./manage.css";
import CreateService from "../create/CreateService";
import { EditCar } from "../index";
import { useCarsUIStore } from "../../stores/uiStores";
import { useCarAdminHandlers } from "../../pages/cars/hooks/useCarAdminHandlers";
import ManageModal from "./ManageModal";

const MANAGE_CAR_BUTTONS = [
  { name: "createService", type: "create", content: "Create Service" },
  { name: "editCar", type: "edit", content: "Edit Car" },
  { name: "deleteCar", type: "delete", content: "Delete Car" },
];

const ManageCar = () => {
  const selectedCar = useCarsUIStore((s) => s.selectedCar);
  const manageCarOpen = useCarsUIStore((s) => s.manageCarOpen);
  const toggleManageCar = useCarsUIStore((s) => s.toggleManageCar);
  const { handleCar } = useCarAdminHandlers();

  return (
    <ManageModal
      buttons={MANAGE_CAR_BUTTONS}
      isOpen={manageCarOpen}
      onClose={toggleManageCar}
      handleAction={handleCar}
      selectedId={selectedCar?._id}
    >
      <CreateService />
      <EditCar />
    </ManageModal>
  );
};

export default ManageCar;
