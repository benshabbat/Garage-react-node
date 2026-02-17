import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
import { ModalForm } from "../index";

const EditPaidService = () => {
  const { useEditService, modals } = useServicesAdminContext();
  const { onSubmit, formData, setFormData } = useEditService(
    modals.editPaid.handle
  );

  return (
    <ModalForm
      isOpen={modals.editPaid.isOpen}
      onClose={modals.editPaid.handle}
      onSubmit={onSubmit}
      setFormData={setFormData}
      formData={formData}
      title="Edit Pay"
      inputs={[{ name: "paid", type: "checkbox", checked: formData?.paid }]}
    />
  );
};

export default EditPaidService;
