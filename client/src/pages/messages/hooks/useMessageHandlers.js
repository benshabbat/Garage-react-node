import { useMessageForm } from "./useMessageForm";
import { useMessageActions } from "./useMessageActions";
import { usersToOptions } from "../utils/messageValidation";

/**
 * Custom hook for message action handlers
 * @param {Object} selectedMsg - Currently selected message
 * @param {Object} user - Current user
 * @param {Array} users - List of all users
 * @param {Object} modals - Modal handlers
 * @returns {Object} Handler functions for message operations
 */
export const useMessageHandlers = (selectedMsg, user, users, modals) => {
  // Message actions
  const messageActions = useMessageActions(selectedMsg, user);

  /**
   * Hook for creating message
   */
  const useCreateMsg = () => {
    const options = user?.isAdmin ? usersToOptions(users) : undefined;
    const messageForm = useMessageForm(user);
    
    const onSubmit = (e) => {
      messageActions.onSubmitCreateMessage(e, messageForm.formData, modals.createMsg.handle);
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
    messageActions.onSubmitDeleteMessage(e, modals.deleteMsg.handle);
  };

  return {
    useCreateMsg,
    useDeleteMsg,
  };
};
