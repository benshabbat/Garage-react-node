import { useState } from "react";
import { OpenModal, Form } from "..";
import { createCar } from "../../utils";
import { validCar } from "../../validation/valid";
const CreateCar = ({ handelClick, isOpen, user }) => {
  const [formData, setFormData] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validCar(formData?.numberPlate)) {
      await createCar(user?._id, formData);
      handelClick();
    }
  };

  return (
    <OpenModal
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
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpen}
    />
  );
};

export default CreateCar;
