import { Form, OpenModel } from "../index";
import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
const EditService = () => {
  const { useEditService, modals } = useServicesAdminContext();
  const { onSubmit,formData, setFormData } = useEditService(modals.editService.onClose);

  const options = [
    { value: "pending", label: "Pending" },
    { value: "done", label: "Done" },
    { value: "on-work", label: "On work" },
  ];
  return (
    <OpenModel
      comp={
        <Form
          setData={setFormData}
          title="Edit Car"
          inputs={[
            // { name: "numberPlate", value: service?.car?.numberPlate },
            { name: "title", value: formData?.title },
            { name: "description", value: formData?.description },
            { name: "price", type: "number", value: formData?.price },
            { name: "paid", type: "checkbox", checked: formData?.paid },
          ]}
          options={options}
          nameSelect="status"
          handelClick={modals.editService.onClose}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.editService.isOpen}
    />
  );
};

export default EditService;
