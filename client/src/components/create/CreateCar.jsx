import { useState } from "react";
import { OpenModel, Form } from "..";
import { createCar } from "../../Utils";
import { validCar } from "../../validation/Valid";
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
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpen}
    />
  );
};

export default CreateCar;
