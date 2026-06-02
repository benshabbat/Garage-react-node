import { ModalForm } from "..";
import { useUsersUIStore } from "../../stores/uiStores";
import { useUserHandlers } from "../../pages/users/hooks/useUserHandlers";

const CreateCar = () => {
  const createCarOpen = useUsersUIStore((s) => s.createCarOpen);
  const toggleCreateCar = useUsersUIStore((s) => s.toggleCreateCar);
  const { onSubmitCreateCar, setCarFormData } = useUserHandlers();

  return (
    <ModalForm
      isOpen={createCarOpen}
      onClose={toggleCreateCar}
      onSubmit={onSubmitCreateCar}
      setFormData={setCarFormData}
      title="Create Car"
      inputs={[
        { name: "numberPlate", type: "text" },
        { name: "km", type: "number", min: 0 },
        { name: "brand", type: "text" },
      ]}
    />
  );
};

export default CreateCar;
