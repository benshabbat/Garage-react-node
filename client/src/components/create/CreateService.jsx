import { useState } from "react";
import { OpenModel, Form } from "..";
import { createService } from "../../Utils";
const CreateService = ({ handelClick, isOpen, car }) => {
  const [formData, setFormData] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();
    await createService(car?._id, formData);
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
            { name: "paid", type: "checkbox" },
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
