import { ModalForm } from "../index";
import { useCarsContext } from "../../pages/cars/CarsContext";

const EditCar = () => {
  const { useEditCar, modals, selectedCar } = useCarsContext();
  const { onSubmit, setFormData, formData } = useEditCar();
  
  return (
    <ModalForm
      isOpen={modals.editCar.isOpen}
      onClose={modals.editCar.handle}
      onSubmit={onSubmit}
      setFormData={setFormData}
      formData={formData}
      title="Edit Car"
      inputs={[
        {
          name: "km",
          type: "number",
          value: formData?.km,
          min: selectedCar?.km,
        },
      ]}
    />
  );
};

export default EditCar;
