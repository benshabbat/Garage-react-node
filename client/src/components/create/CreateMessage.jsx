import { OpenModal, Form } from "..";
import { useContextMessages } from "../../pages/messages/MessagesConetxt";

const CreateMessage = () => {
  const { useCreateMsg, modals } = useContextMessages();
  const { onSubmit, setFormData, options } = useCreateMsg();
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
          options={options}
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
