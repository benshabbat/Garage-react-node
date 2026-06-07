import { ModalForm } from "..";
import { useCarsUIStore } from "../../stores/uiStores";
import { useCarHandlers } from "../../pages/cars/hooks/useCarHandlers";
import { serviceStatusOptions } from "../../utils/serviceConstants";

const CreateService = () => {
  const createServiceOpen = useCarsUIStore((s) => s.createServiceOpen);
  const toggleCreateService = useCarsUIStore((s) => s.toggleCreateService);
  const { useCreateService } = useCarHandlers();
  const { onSubmit, setFormData, formData } = useCreateService();

  return (
    <ModalForm
      isOpen={createServiceOpen}
      onClose={toggleCreateService}
      onSubmit={onSubmit}
      setFormData={setFormData}
      formData={formData}
      title="Create Service"
      inputs={[
        { name: "title", type: "text" },
        { name: "description", type: "text" },
        { name: "price", type: "number", min: 0 },
        { name: "paid", type: "checkbox", checked: formData?.paid },
      ]}
      options={serviceStatusOptions}
      nameSelect="status"
    />
  );
};

export default CreateService;
