import "./manage.css";
import { OpenModal } from "../index";
import EditService from "../edit/EditService";
import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
import ButtonManage from "./ButtonManage";
import FormManage from "./FormManage";

const ManageService = () => {
  const { selectedService, modals, handleServiceIdAction } =
    useServicesAdminContext();

  return (
    <OpenModal
      comp={
        <>
          <FormManage handle={modals.manageService.handle}>
            <ButtonManage
              name="editService"
              type="edit"
              handle={handleServiceIdAction}
              value={selectedService?._id}
              content="Edit Service"
            />
            <ButtonManage
              name="deleteService"
              type="delete"
              handle={handleServiceIdAction}
              value={selectedService?._id}
              content="Delete Service"
            />
          </FormManage>
          <EditService />
        </>
      }
      isOpen={modals.manageService.isOpen}
    />
  );
};

export default ManageService;
