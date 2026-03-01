import { ModalForm } from "..";
import { useContextMessages } from "../../pages/messages/MessagesContext";

const CreateMessage = () => {
  const { useCreateMsg, modals } = useContextMessages();
  const { onSubmit, setFormData, options, formData } = useCreateMsg();
  
  return (
    <ModalForm
      isOpen={modals.createMsg.isOpen}
      onClose={modals.createMsg.handle}
      onSubmit={onSubmit}
      setFormData={setFormData}
      formData={formData}
      title="Create Message"
      inputs={[
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
      ]}
      options={options}
      nameSelect="to"
    />
  );
};

export default CreateMessage;
