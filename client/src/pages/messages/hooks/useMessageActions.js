import {
  deleteMessage,
  createMessage,
  createMessageToAdmin,
} from "../../../utils";

/**
 * Custom hook for message CRUD operations
 * @param {Object} selectedMsg - Currently selected message
 * @param {Object} user - Current user
 * @returns {Object} CRUD operation functions
 */
export const useMessageActions = (selectedMsg, user) => {
  
  /**
   * Create a new message
   */
  const onSubmitCreateMessage = async (e, formData, handleCreateMessage) => {
    e.preventDefault();
    if (user?.isAdmin) {
      await createMessage(formData, formData?.to);
    } else {
      await createMessageToAdmin(formData);
    }
    handleCreateMessage();
  };

  /**
   * Delete a message
   */
  const onSubmitDeleteMessage = async (e, handleDeleteMessage) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "deleteMessage") {
      await deleteMessage(selectedMsg?._id);
      handleDeleteMessage();
    }
  };

  return {
    onSubmitCreateMessage,
    onSubmitDeleteMessage,
  };
};
