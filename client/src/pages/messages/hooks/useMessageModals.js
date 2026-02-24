import useOpenModal from "../../../hooks/useOpenModal";

/**
 * Custom hook for managing message-related modal states
 * @returns {Object} Modal handlers and states
 */
export const useMessageModals = () => {
  const [handleDeleteMessage, isOpenModalDeleteMessage] = useOpenModal();
  const [handleCreateMessage, isOpenCreateMessage] = useOpenModal();

  return {
    deleteMsg: { isOpen: isOpenModalDeleteMessage, handle: handleDeleteMessage },
    createMsg: { isOpen: isOpenCreateMessage, handle: handleCreateMessage },
  };
};
