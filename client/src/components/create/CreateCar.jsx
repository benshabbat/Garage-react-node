import { ModalForm } from "..";
import { useUsersContext } from "../../pages/users/UsersContext";

const CreateCar = () => {
  const { onSubmitCreateCar, setFormData, modals } = useUsersContext();

  return (
    <ModalForm
      isOpen={modals.createCar.isOpen}
      onClose={modals.createCar.handle}
      onSubmit={onSubmitCreateCar}
      setFormData={setFormData}
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
