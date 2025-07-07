import { Form, OpenModal } from "../index";
import { useCarsContext } from "../../pages/cars/CarsContext";
import Submitted from "../Submitted";

const EditCar = () => {
  const { useEditCar, modals, selectedCar } = useCarsContext();
  const { onSubmit, setFormData, formData, isSubmitted, setIsSubmitted } =
    useEditCar();
  //Example for a pop up modal that allows the user to edit a car's details
  if (isSubmitted) {
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000); // Reset after 3 seconds
    return (
      <Submitted
        setIsSubmitted={setIsSubmitted}
        name={"Edited Car"}
        text={"Editing was successful!"}
      />
    );
  }
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
          handleClick={modals.editCar.handle}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.editCar.isOpen}
    />
  );
};

export default EditCar;
