import { useState } from "react";
import { createReqService } from "../../Utils";
import { OpenModel, Form } from "..";
const ReqService = ({ handelClick, car, isOpen, user }) => {
  const [formData, setFormData] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      title: car?.numberPlate.toString(),
      from: user?._id,
    }));
    if (formData?.title) {
      await createReqService(formData);
      handelClick();
    }
  };
  return (
    <OpenModel
      comp={
        <Form
          setData={setFormData}
          title="Request Service"
          inputs={[
            { name: "title", value: car?.numberPlate.toString() },
            {name: "description"},
          ]}
          handelClick={handelClick}
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpen}
    />
  );
};

export default ReqService;
