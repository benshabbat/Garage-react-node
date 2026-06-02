import { ModalForm } from "../index";
import { useServicesUIStore } from "../../stores/uiStores";
import { useServiceHandlers } from "../../pages/servicesAdmin/hooks/useServiceHandlers";

const EditPaidService = () => {
  const editPaidOpen = useServicesUIStore((s) => s.editPaidOpen);
  const toggleEditPaid = useServicesUIStore((s) => s.toggleEditPaid);
  const { useEditService } = useServiceHandlers();
  const { onSubmit, formData, setFormData } = useEditService(toggleEditPaid);

  return (
    <ModalForm
      isOpen={editPaidOpen}
      onClose={toggleEditPaid}
      onSubmit={onSubmit}
      setFormData={setFormData}
      formData={formData}
      title="Edit Pay"
      inputs={[{ name: "paid", type: "checkbox", checked: formData?.paid }]}
    />
  );
};

export default EditPaidService;
