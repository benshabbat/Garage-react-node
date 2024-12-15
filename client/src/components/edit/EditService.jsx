import { Form, OpenModal } from "../index";
import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
const EditService = () => {
  const { useEditService, modals, options } = useServicesAdminContext();
  const { onSubmit, formData, setFormData } = useEditService(
    modals.editService.handle
  );

  return (
    <OpenModal
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
          handleClick={modals.editService.handle}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.editService.isOpen}
    />
  );
};

export default EditService;
