import PropTypes from "prop-types";
import { OpenModal, Form } from "../index";

/**
 * Generic Modal Form Component
 * Wraps OpenModal and Form to reduce code duplication
 */
const ModalForm = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  inputs,
  options,
  nameSelect,
  formData,
  setFormData,
  isFocus = true,
  validateOnBlur = false,
  comp, // Custom component instead of Form
}) => {
  // If comp exists, wrap it with Form structure
  if (comp) {
    return (
      <OpenModal
        isOpen={isOpen}
        comp={
          <Form
            setData={setFormData}
            formData={formData}
            title={title}
            inputs={inputs}
            options={options}
            nameSelect={nameSelect}
            handleClick={onClose}
            onSubmit={onSubmit}
            isFocus={isFocus}
            validateOnBlur={validateOnBlur}
            comp={comp}
          />
        }
      />
    );
  }

  // Default behavior - use Form with inputs only
  return (
    <OpenModal
      isOpen={isOpen}
      comp={
        <Form
          setData={setFormData}
          formData={formData}
          title={title}
          inputs={inputs}
          options={options}
          nameSelect={nameSelect}
          handleClick={onClose}
          onSubmit={onSubmit}
          isFocus={isFocus}
          validateOnBlur={validateOnBlur}
        />
      }
    />
  );
};

ModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  inputs: PropTypes.array,
  options: PropTypes.array,
  nameSelect: PropTypes.string,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  isFocus: PropTypes.bool,
  validateOnBlur: PropTypes.bool,
  comp: PropTypes.node, // Custom component
};

export default ModalForm;
