
import { Form, OpenModal } from "../index";
import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
const EditStatusService = () => {
  const { useEditService, modals,options } = useServicesAdminContext();
  const { onSubmit, setFormData } = useEditService(modals.editStatusService.handle);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Edit Status"
          sec_title="Edit Status"
          options={options}
          nameSelect="status"
          handleClick={modals.editStatusService.handle}
          onSubmit={handleSubmit}
        />
      }
      isOpen={modals.editStatusService.isOpen}
    />
  );
};

export default EditStatusService;
