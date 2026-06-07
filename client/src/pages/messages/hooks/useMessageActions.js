import {
  deleteMessage,
  createMessage,
  createMessageToAdmin,
} from "../../../api/services/messageApi";
import { extractErrorMessage } from "../../../utils/handlerUtils";

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
    if (user?.isAdmin && !formData?.to) {
      throw new Error("Please select a recipient.");
    }
    try {
      if (user?.isAdmin) {
        await createMessage(formData, formData.to);
      } else {
        await createMessageToAdmin(formData);
      }
      handleCreateMessage();
    } catch (err) {
      throw new Error(extractErrorMessage(err));
    }
  };

  /**
   * Delete a message
   */
  const onSubmitDeleteMessage = async (e, handleDeleteMessage) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "deleteMessage") {
      try {
        await deleteMessage(selectedMsg?._id);
        handleDeleteMessage();
      } catch (err) {
        throw new Error(extractErrorMessage(err));
      }
    }
  };

  return {
    onSubmitCreateMessage,
    onSubmitDeleteMessage,
  };
};
