import { Form, OpenModal } from "../index";
import { useCarsContext } from "../../pages/cars/CarsContext";
import Submitted from "../Submitted";

const EditCar = () => {
  const { useEditCar,modals,selectedCar,isSubmitted, setIsSubmitted  } = useCarsContext();
  const { onSubmit, setFormData,formData} = useEditCar()


  if (isSubmitted) {
    setTimeout(() => {
      setIsSubmitted(false)
    }, 7000);
    return <Submitted setIsSubmitted={setIsSubmitted} review={true} name={"review"} text={"Thank you for your review!"}/>
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
