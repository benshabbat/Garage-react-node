import useOpenModal from "../../../hooks/useOpenModal";

/**
 * Custom hook for managing account-related modal states
 * @returns {Object} Modal handlers and states
 */
export const useAccountModals = () => {
  const [handleReqService, isOpenReqService] = useOpenModal();
  const [handleServices, isOpenServices] = useOpenModal();

  return {
    reqService: { isOpen: isOpenReqService, handle: handleReqService },
    services: { isOpen: isOpenServices, handle: handleServices },
  };
};
