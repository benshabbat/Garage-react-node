import { OpenModal, Form } from "..";
import { useCarsContext } from "../../pages/cars/CarsContext";

const CreateService = () => {
  const { useCreateService, options, modals } = useCarsContext();
  const { onSubmit, setFormData, formData } = useCreateService();

  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Create Service"
          inputs={[
            { name: "title", type: "text" },
            { name: "description", type: "text" },
            { name: "price", type: "number", min: 0 },
            { name: "paid", type: "checkbox", checked: formData?.paid },
          ]}
          options={options}
          nameSelect="status"
          handleClick={modals.createService.handle}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.createService.isOpen}
    />
  );
};

export default CreateService;