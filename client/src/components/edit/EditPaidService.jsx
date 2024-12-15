import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
import { Form, OpenModal } from "../index";
const EditPaidService = () => {
  const { useEditService, modals } = useServicesAdminContext();
  const { onSubmit, formData, setFormData } = useEditService(
    modals.editPaid.handle
  );

  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Edit Pay"
          inputs={[{ name: "paid", type: "checkbox", checked: formData?.paid }]}
          nameSelect="status"
          handleClick={modals.editPaid.handle}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.editPaid.isOpen}
    />
  );
};

export default EditPaidService;
