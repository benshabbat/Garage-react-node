import { useState } from "react";
import { OpenModal, Form } from "..";
import { createService } from "../../utils";
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
    <OpenModal
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
