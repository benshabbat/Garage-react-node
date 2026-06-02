import { ModalForm } from "../index";
import { useServicesUIStore } from "../../stores/uiStores";
import { useServiceHandlers } from "../../pages/servicesAdmin/hooks/useServiceHandlers";
import { serviceStatusOptions } from "../../utils/serviceConstants";

const EditStatusService = () => {
  const editStatusOpen = useServicesUIStore((s) => s.editStatusOpen);
  const toggleEditStatus = useServicesUIStore((s) => s.toggleEditStatus);
  const { useEditService } = useServiceHandlers();
  const { onSubmit, setFormData, formData } = useEditService(toggleEditStatus);

  return (
    <ModalForm
      isOpen={editStatusOpen}
      onClose={toggleEditStatus}
      onSubmit={onSubmit}
      setFormData={setFormData}
      formData={formData}
      title="Edit Status"
      inputs={[]}
      options={serviceStatusOptions}
      nameSelect="status"
    />
  );
};

export default EditStatusService;
