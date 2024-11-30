import { OpenModel, Form } from "..";
import { useContextMessages } from "../../pages/messages/MessagesConetxt";

const CreateMessage = () => {
  const { modals, user, users, onSubmit, setFormData } = useContextMessages();

  return (
    <OpenModel
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
          handelClick={modals.createMsg.handel}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.createMsg.isOpen}
    />
  );
};

export default CreateMessage;
