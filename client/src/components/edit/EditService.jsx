import { ModalForm } from "../index";
import { useServicesUIStore } from "../../stores/uiStores";
import { useServiceHandlers } from "../../pages/servicesAdmin/hooks/useServiceHandlers";
import { serviceStatusOptions } from "../../utils/serviceConstants";

const EditService = () => {
  const editServiceOpen = useServicesUIStore((s) => s.editServiceOpen);
  const toggleEditService = useServicesUIStore((s) => s.toggleEditService);
  const { useEditService } = useServiceHandlers();
  const { onSubmit, formData, setFormData } = useEditService(toggleEditService);

  return (
    <ModalForm
      isOpen={editServiceOpen}
      onClose={toggleEditService}
      onSubmit={onSubmit}
      setFormData={setFormData}
      formData={formData}
      title="Edit Service"
      inputs={[
        { name: "title", type: "text", value: formData?.title },
        { name: "description", type: "text", value: formData?.description },
        { name: "price", type: "number", value: formData?.price },
        { name: "paid", type: "checkbox", checked: formData?.paid },
      ]}
      options={serviceStatusOptions}
      nameSelect="status"
    />
  );
};

export default EditService;
