import { useContextMessages } from "../../pages/messages/MessagesContext";
import Delete from "./Delete";
const DeleteMessage = () => {
    const { modals,useDeleteMsg,selectedMsg } = useContextMessages();
    return (
    <Delete
      deleteData={selectedMsg?.title}
      handle={modals.deleteMsg.handle}
      nameData="deleteMessage"
      isOpen={modals.deleteMsg.isOpen}
      handleDelete={useDeleteMsg}
    />
  );
};

export default DeleteMessage;