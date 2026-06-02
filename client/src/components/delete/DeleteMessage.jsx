import Delete from "./Delete";
import { useMessagesUIStore } from "../../stores/uiStores";
import { useMessageHandlers } from "../../pages/messages/hooks/useMessageHandlers";
const DeleteMessage = () => {
  const selectedMsg = useMessagesUIStore((s) => s.selectedMsg);
  const deleteMsgOpen = useMessagesUIStore((s) => s.deleteMsgOpen);
  const toggleDeleteMsg = useMessagesUIStore((s) => s.toggleDeleteMsg);
  const { useDeleteMsg } = useMessageHandlers();
  return (
    <Delete
      deleteData={selectedMsg?.title}
      handle={toggleDeleteMsg}
      nameData="deleteMessage"
      isOpen={deleteMsgOpen}
      handleDelete={useDeleteMsg}
    />
  );
};

export default DeleteMessage;