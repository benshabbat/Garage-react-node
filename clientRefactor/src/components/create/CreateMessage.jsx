import { OpenModal, Form } from "..";
import { useContextMessages } from "../../pages/messages/MessagesConetxt";

const CreateMessage = () => {
  const { modals, user, users, onSubmit, setFormData } = useContextMessages();

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
          handleClick={modals.createMsg.handle}
          onSubmit={onSubmit}
        />
      }
      isOpen={modals.createMsg.isOpen}
    />
  );
};

export default CreateMessage;
