import "./openModal.css";

const OpenModal = ({ comp = null, isOpen = false }) => {
  return (
    isOpen && (
      <div className="open-modal-background">
        <div className="open-modal-container">{comp} </div>
      </div>
    )
  );
};

export default OpenModal;
