import { useState } from "react";
import { Form, OpenModel } from "../index";
import { updateService } from "../../Utils";
const EditService = ({ handelClick, isOpen, service }) => {
  const [formData, setFormData] = useState(service);
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateService(service?._id, formData);
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
          title="Edit Car"
          sec_title="enter your name & password"
          inputs={[
            { name: "numberPlate", value: service?.car?.numberPlate },
            { name: "title", value: formData?.title },
            { name: "description", value: formData?.description },
            { name: "price", type: "number", value: formData?.price },
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

export default EditService;
