import { useState } from "react";
import { OpenModel, Form } from "..";
import { createService } from "../../utils";
import { useCarsContext } from "../../pages/cars/CarsContext";
const CreateService = ({ handelClick, isOpen }) => {
  const { selectedCar } = useCarsContext()
  const [formData, setFormData] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();
    await createService(selectedCar?._id, formData);
    handelClick();
  };
  const options = [
    { value: "pending", label: "Pending" },
    { value: "done", label: "Done" },
    { value: "on-work", label: "On work" },
  ];

  return (
    <OpenModel
      comp={
        <Form
          setData={setFormData}
          title="Create Service"
          inputs={[
            { name: "title" },
            { name: "description" },
            { name: "price", type: "number", min: 0 },
            { name: "paid", type: "checkbox", checked: formData?.paid },
          ]}
          options={options}
          nameSelect="status"
          handelClick={handelClick}
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpen}
    />
  );
};

export default CreateService;
