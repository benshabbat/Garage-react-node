import DeleteModal from "./DeleteModal";
import { useMessagesUIStore } from "../../stores/uiStores";
import { useMessageHandlers } from "../../pages/messages/hooks/useMessageHandlers";

const DeleteMessage = () => (
  <DeleteModal
    useStore={useMessagesUIStore}
    selectedKey="selectedMsg"
    isOpenKey="deleteMsgOpen"
    toggleKey="toggleDeleteMsg"
    useHandlers={useMessageHandlers}
    handlerKey="useDeleteMsg"
    displayField="title"
    nameData="deleteMessage"
  />
);

export default DeleteMessage;
