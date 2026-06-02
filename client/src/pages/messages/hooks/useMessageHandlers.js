import { useMessageForm } from "./useMessageForm";
import { useMessageActions } from "./useMessageActions";
import { usersToOptions } from "../utils/messageValidation";
import { useMessagesUIStore } from "../../../stores/uiStores";
import { useUserStore } from "../../../stores/userStore";
import { useAdminStore } from "../../../stores/adminStore";

export const useMessageHandlers = () => {
  const selectedMsg = useMessagesUIStore((s) => s.selectedMsg);
  const toggleCreateMsg = useMessagesUIStore((s) => s.toggleCreateMsg);
  const toggleDeleteMsg = useMessagesUIStore((s) => s.toggleDeleteMsg);
  const user = useUserStore((s) => s.user);
  const users = useAdminStore((s) => s.users);
  const messageActions = useMessageActions(selectedMsg, user);

  /**
   * Hook for creating message
   */
  const useCreateMsg = () => {
    const options = user?.isAdmin ? usersToOptions(users) : undefined;
    const messageForm = useMessageForm(user);
    
    const onSubmit = (e) => {
      messageActions.onSubmitCreateMessage(e, messageForm.formData, toggleCreateMsg);
    };
    
    return {
      onSubmit,
      setFormData: messageForm.setFormData,
      formData: messageForm.formData,
      options
    };
  };
    
  /**
   * Hook for deleting message
   */
  const useDeleteMsg = (e) => {
    messageActions.onSubmitDeleteMessage(e, toggleDeleteMsg);
  };

  return {
    useCreateMsg,
    useDeleteMsg,
  };
};
