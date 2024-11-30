import { OpenModel, Form } from "..";

import { useCarsContext } from "../../pages/cars/CarsContext";
const CreateService = () => {
  const { useCreateService, options, modals } = useCarsContext();

  const { onSubmit, setFormData, formData } = useCreateService();

  return (
    <OpenModel
      comp={
        <Form
          setData={setFormData}
          title="Create Service"
          inputs={[
            { name: "title" },
            { name: "description" },
            { name: "price", type: "number", min: 0 },
            { name: "paid", type: "checkbox" },
          ]}
          options={options}
          nameSelect="status"
          handelClick={modals.createService.onClose}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.createService.isOpen}
    />
  );
};

export default CreateService;
