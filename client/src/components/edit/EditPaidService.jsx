import { useState } from "react";
import { Form, OpenModel } from "../index";
import { updateService } from "../../Utils";
const EditPaidService = ({ handelClick, isOpen, service }) => {
    const [formData, setFormData] = useState(service);
    const onSubmit = async (e) => {
      e.preventDefault();
      await updateService(service?._id, formData);
      handelClick();
    };
    return (
        <OpenModel
          comp={
            <Form
              setData={setFormData}
              title="Edit Pay"
              sec_title="Edit Pay"
              inputs={[
                { name: "paid", type: "checkbox", checked: formData?.paid },
              ]}
              nameSelect="status"
              handelClick={handelClick}
              onSubmit={onSubmit}
            />
          }
          isOpen={isOpen}
        />
      );
}

export default EditPaidService