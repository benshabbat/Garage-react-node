import { ModalForm } from "..";
import { useMessagesUIStore } from "../../stores/uiStores";
import { useMessageHandlers } from "../../pages/messages/hooks/useMessageHandlers";

const CreateMessage = () => {
  const createMsgOpen = useMessagesUIStore((s) => s.createMsgOpen);
  const toggleCreateMsg = useMessagesUIStore((s) => s.toggleCreateMsg);
  const { useCreateMsg } = useMessageHandlers();
  const { onSubmit, setFormData, options, formData } = useCreateMsg();

  return (
    <ModalForm
      isOpen={createMsgOpen}
      onClose={toggleCreateMsg}
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
