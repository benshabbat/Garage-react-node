import "./manage.css";
import { OpenModal } from "../index";
import EditService from "../edit/EditService";
import { useServicesUIStore } from "../../stores/uiStores";
import { useServiceAdminHandlers } from "../../pages/servicesAdmin/hooks/useServiceAdminHandlers";
import ButtonManage from "./ButtonManage";
import FormManage from "./FormManage";

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
    <OpenModal
      comp={
        <>
          <FormManage handle={toggleManageService}>
            {MANAGE_SERVICE_BUTTONS.map(({ name, type, content }) => (
              <ButtonManage
                key={name}
                name={name}
                type={type}
                handle={handleServiceIdAction}
                value={selectedService?._id}
                content={content}
              />
            ))}
          </FormManage>
          <EditService />
        </>
      }
      isOpen={manageServiceOpen}
    />
  );
};

export default ManageService;
