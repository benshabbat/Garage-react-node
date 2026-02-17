import "./openModal.css";
import PropTypes from "prop-types";

const OpenModal = ({ comp = null, isOpen = false }) => {
  return (
    isOpen && (
      <div className="open-modal-background">
        <div className="open-modal-container">{comp} </div>
      </div>
    )
  );
};

OpenModal.propTypes = {
  comp: PropTypes.node,
  isOpen: PropTypes.bool,
};

export default OpenModal;
