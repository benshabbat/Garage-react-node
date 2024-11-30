
import { Form, OpenModal } from "../index";
import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
const EditStatusService = () => {
  const { useEditService, modals,options } = useServicesAdminContext();
  const { onSubmit, setFormData } = useEditService(modals.editStatusService.handel);

  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Edit Status"
          sec_title="Edit Status"
          options={options}
          nameSelect="status"
          handelClick={modals.editStatusService.handel}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.editStatusService.isOpen}
    />
  );
};

export default EditStatusService;
