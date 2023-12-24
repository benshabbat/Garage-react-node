import { useState } from "react";
import { Form, OpenModel } from "../index";
import { updateService } from "../../Utils";
const EditStatusService = ({ handelClick, isOpen, service }) => {
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
          title="Edit Status"
          sec_title="Edit Status"
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

export default EditStatusService;
