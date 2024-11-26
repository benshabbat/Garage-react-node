import { OpenModel, Form } from "..";
import { useUsersContext } from "../../pages/users/UsersContext";
const CreateCar = ({ handelClick, isOpen }) => {

  const { onSubmitCreateCar,setFormData } = useUsersContext();

  return (
    <OpenModel
      comp={
        <Form
          data
          setData={setFormData}
          title="Create Car"
          inputs={[
            {
              name: "numberPlate",
            },
            { name: "km", type: "number", min: 0 },
            { name: "brand" },
          ]}
          handelClick={handelClick}
          onSubmit={onSubmitCreateCar}
        />
      }
      isOpen={isOpen}
    />
  );
};

export default CreateCar;
