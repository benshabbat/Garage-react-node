import { OpenModal, Form } from "..";
import { useCarsContext } from "../../pages/cars/CarsContext";
const CreateService = () => {
  const { useCreateService, options, modals } = useCarsContext();
  const { onSubmit, setFormData } = useCreateService();

  return (
    <OpenModal
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
          handelClick={modals.createService.handel}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.createService.isOpen}
    />
  );
};

export default CreateService;
