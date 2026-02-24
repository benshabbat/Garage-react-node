import useOpenModal from "../../../hooks/useOpenModal";

/**
 * Custom hook for managing service-related modal states
 * @returns {Object} Modal handlers and states
 */
export const useServiceModals = () => {
  const [handleManageService, isOpenManageService] = useOpenModal();
  const [handleEditService, isOpenEditService] = useOpenModal();
  const [handleStatus, isOpenStatus] = useOpenModal();
  const [handlePaid, isOpenPaid] = useOpenModal();

  return {
    manageService: { isOpen: isOpenManageService, handle: handleManageService },
    editStatusService: { isOpen: isOpenStatus, handle: handleStatus },
    editPaid: { isOpen: isOpenPaid, handle: handlePaid },
    editService: { isOpen: isOpenEditService, handle: handleEditService },
  };
};
