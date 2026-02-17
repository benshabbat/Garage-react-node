import { ModalForm } from "../index";
import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";

const EditService = () => {
  const { useEditService, modals, options } = useServicesAdminContext();
  const { onSubmit, formData, setFormData } = useEditService(
    modals.editService.handle
  );

  return (
    <ModalForm
      isOpen={modals.editService.isOpen}
      onClose={modals.editService.handle}
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
      options={options}
      nameSelect="status"
    />
  );
};

export default EditService;
