import useOpenModal from "../../../hooks/useOpenModal";

/**
 * Custom hook for managing header-related modal states
 * @returns {Object} Modal handlers and states
 */
export const useHeaderModals = () => {
  const [onLogin, isOpenLogin] = useOpenModal();

  return {
    login: { isOpen: isOpenLogin, handle: onLogin },
  };
};
