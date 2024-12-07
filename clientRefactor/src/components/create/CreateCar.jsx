import { OpenModal, Form } from "..";
import { useUsersContext } from "../../pages/users/UsersContext";
const CreateCar = () => {

  const { onSubmitCreateCar,setFormData,modals } = useUsersContext();

  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Create Car"
          inputs={[
            {
              name: "numberPlate",
            },
            { name: "km", type: "number", min: 0 },
            { name: "brand" },
          ]}
          handleClick={modals.createCar.handle}
          onSubmit={onSubmitCreateCar}
        />
      }
      isOpen={modals.createCar.isOpen}
    />
  );
};

export default CreateCar;
