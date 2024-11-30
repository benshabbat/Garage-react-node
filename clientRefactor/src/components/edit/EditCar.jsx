import { Form, OpenModal } from "../index";
import { useCarsContext } from "../../pages/cars/CarsContext";

const EditCar = () => {
  const { useEditCar,modals,selectedCar } = useCarsContext();
  const { onSubmit, setFormData,formData } = useEditCar()

  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Edit Car"
          sec_title="enter your km"
          inputs={[
            {
              name: "km",
              type: "number",
              value: formData?.km,
              min: selectedCar?.km,
            },
          ]}
          handelClick={modals.editCar.handel}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.editCar.isOpen}
    />
  );
};

export default EditCar;
