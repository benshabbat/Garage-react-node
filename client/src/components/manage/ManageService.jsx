import "./manage.css";
import EditService from "../edit/EditService";
import { useServicesUIStore } from "../../stores/uiStores";
import { useServiceAdminHandlers } from "../../pages/servicesAdmin/hooks/useServiceAdminHandlers";
import ManageModal from "./ManageModal";

const MANAGE_SERVICE_BUTTONS = [
  { name: "editService",   type: "edit",   content: "Edit Service"   },
  { name: "deleteService", type: "delete", content: "Delete Service" },
];

const ManageService = () => {
  const selectedService = useServicesUIStore((s) => s.selectedService);
  const manageServiceOpen = useServicesUIStore((s) => s.manageServiceOpen);
  const toggleManageService = useServicesUIStore((s) => s.toggleManageService);
  const { handleServiceIdAction } = useServiceAdminHandlers();

  return (
    <ManageModal
      buttons={MANAGE_SERVICE_BUTTONS}
      isOpen={manageServiceOpen}
      onClose={toggleManageService}
      handleAction={handleServiceIdAction}
      selectedId={selectedService?._id}
    >
      <EditService />
    </ManageModal>
  );
};

export default ManageService;
