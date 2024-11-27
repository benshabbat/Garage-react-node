
import { Form, OpenModel } from "../index";

import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
const EditStatusService = () => {

  const { useEditService, modals } = useServicesAdminContext();
  const { onSubmit, setFormData } = useEditService(modals.editStatusService.onClose);


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
          title="Edit Status"
          sec_title="Edit Status"
          options={options}
          nameSelect="status"
          handelClick={modals.editStatusService.onClose}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.editStatusService.isOpen}
    />
  );
};

export default EditStatusService;
