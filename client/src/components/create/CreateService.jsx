import { ModalForm } from "..";
import { useCarsContext } from "../../pages/cars/CarsContext";

const CreateService = () => {
  const { useCreateService, options, modals } = useCarsContext();
  const { onSubmit, setFormData, formData } = useCreateService();

  return (
    <ModalForm
      isOpen={modals.createService.isOpen}
      onClose={modals.createService.handle}
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
      options={options}
      nameSelect="status"
    />
  );
};

export default CreateService;