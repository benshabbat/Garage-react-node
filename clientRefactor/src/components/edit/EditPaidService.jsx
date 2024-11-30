import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
import { Form, OpenModel } from "../index";
const EditPaidService = () => {
  const { useEditService, modals } = useServicesAdminContext();
  const { onSubmit, formData, setFormData } = useEditService(
    modals.editPaid.handel
  );

  return (
    <OpenModel
      comp={
        <Form
          setData={setFormData}
          title="Edit Pay"
          inputs={[{ name: "paid", type: "checkbox", checked: formData?.paid }]}
          nameSelect="status"
          handelClick={modals.editPaid.handel}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.editPaid.isOpen}
    />
  );
};

export default EditPaidService;
