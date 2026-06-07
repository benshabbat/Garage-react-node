import PropTypes from "prop-types";
import { OpenModal } from "../index";
import ButtonManage from "./ButtonManage";
import FormManage from "./FormManage";

const ManageModal = ({ buttons, isOpen, onClose, handleAction, selectedId, children }) => (
  <OpenModal
    comp={
      <>
        <FormManage handle={onClose}>
          {buttons.map(({ name, type, content }) => (
            <ButtonManage
              key={name}
              name={name}
              type={type}
              handle={handleAction}
              value={selectedId}
              content={content}
            />
          ))}
        </FormManage>
        {children}
      </>
    }
    isOpen={isOpen}
    onClose={onClose}
  />
);

ManageModal.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["create", "edit", "delete"]).isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
  selectedId: PropTypes.string,
  children: PropTypes.node,
};

export default ManageModal;
