import "./openModal.css";
import PropTypes from "prop-types";
import { useOpenModalKeyboard } from "./hooks/useOpenModalKeyboard";

const OpenModal = ({ comp = null, isOpen = false, onClose, dialogTitle }) => {
  useOpenModalKeyboard(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="open-modal-background"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className="open-modal-container"
        role="dialog"
        aria-modal="true"
        aria-label={dialogTitle || undefined}
      >
        {comp}
      </div>
    </div>
  );
};

OpenModal.propTypes = {
  comp: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  dialogTitle: PropTypes.string,
};

export default OpenModal;
