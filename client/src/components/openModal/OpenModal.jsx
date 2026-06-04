import "./openModal.css";
import { useEffect } from "react";
import PropTypes from "prop-types";

const OpenModal = ({ comp = null, isOpen = false, onClose }) => {
  useEffect(() => {
    if (!isOpen || !onClose) return;
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="open-modal-background"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div
        className="open-modal-container"
        role="dialog"
        aria-modal="true"
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
};

export default OpenModal;
