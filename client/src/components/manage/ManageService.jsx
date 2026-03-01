import "./manage.css";
import { OpenModal } from "../index";
import EditService from "../edit/EditService";
import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
import ButtonManage from "./ButtonManage";
import FormManage from "./FormManage";

const MANAGE_SERVICE_BUTTONS = [
  { name: "editService",   type: "edit",   content: "Edit Service"   },
  { name: "deleteService", type: "delete", content: "Delete Service" },
];

const ManageService = () => {
  const { selectedService, modals, handleServiceIdAction } =
    useServicesAdminContext();

  return (
    <OpenModal
      comp={
        <>
          <FormManage handle={modals.manageService.handle}>
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
      isOpen={modals.manageService.isOpen}
    />
  );
};

export default ManageService;
