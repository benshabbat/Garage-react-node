import { ModalForm } from "../index";
import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";

const EditStatusService = () => {
  const { useEditService, modals, options } = useServicesAdminContext();
  const { onSubmit, setFormData, formData } = useEditService(
    modals.editStatusService.handle
  );

  return (
    <ModalForm
      isOpen={modals.editStatusService.isOpen}
      onClose={modals.editStatusService.handle}
      onSubmit={onSubmit}
      setFormData={setFormData}
      formData={formData}
      title="Edit Status"
      inputs={[]}
      options={options}
      nameSelect="status"
    />
  );
};

export default EditStatusService;
