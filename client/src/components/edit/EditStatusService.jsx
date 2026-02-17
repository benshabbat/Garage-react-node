import { Form, OpenModal } from "../index";
import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
const EditStatusService = () => {
  const { useEditService, modals, options } = useServicesAdminContext();
  const { onSubmit, setFormData, formData } = useEditService(
    modals.editStatusService.handle,
  );

  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          formData={formData}
          title="Edit Status"
          sec_title="Edit Status"
          options={options}
          inputs={[]}
          nameSelect="status"
          handleClick={modals.editStatusService.handle}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.editStatusService.isOpen}
    />
  );
};

export default EditStatusService;
