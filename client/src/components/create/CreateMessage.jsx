import { useState } from "react";
import { OpenModal, Form } from "..";
import { createMessage, createMessageToAdmin } from "../../utils";

const CreateMessage = ({ handelClick, isOpen, user, users = null }) => {
  const [formData, setFormData] = useState({
    from: user?._id,
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (user?.isAdmin) {
      await createMessage(formData, formData?.to);
    } else {
      await createMessageToAdmin(formData);
    }
    handelClick();
  };

  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Create Message"
          inputs={[
            { name: "title" },
            { name: "description", type: "textarea" },
          ]}
          options={user?.isAdmin ? users : null}
          nameSelect="to"
          handelClick={handelClick}
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpen}
    />
  );
};

export default CreateMessage;
