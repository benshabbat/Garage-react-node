import { ModalForm } from "../index";
import { useCarsUIStore } from "../../stores/uiStores";
import { useCarHandlers } from "../../pages/cars/hooks/useCarHandlers";

const EditCar = () => {
  const selectedCar = useCarsUIStore((s) => s.selectedCar);
  const editCarOpen = useCarsUIStore((s) => s.editCarOpen);
  const toggleEditCar = useCarsUIStore((s) => s.toggleEditCar);
  const { useEditCar } = useCarHandlers();
  const { onSubmit, setFormData, formData } = useEditCar();

  return (
    <ModalForm
      isOpen={editCarOpen}
      onClose={toggleEditCar}
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
