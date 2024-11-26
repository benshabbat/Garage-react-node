import { useState } from "react";
import { Form, OpenModel } from "../index";
import { updateCar } from "../../utils";
import { useCarsContext } from "../../pages/cars/CarsContext";

const EditCar = ({ handelClick, isOpen }) => {
  const { selectedCar } = useCarsContext();
  const [formData, setFormData] = useState(selectedCar);
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateCar(selectedCar?._id, formData);
    handelClick();
  };
  return (
    <OpenModel
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
          handelClick={handelClick}
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpen}
    />
  );
};

export default EditCar;
