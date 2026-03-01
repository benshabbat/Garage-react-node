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
  serverError = null,
}) => {
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
          serverError={serverError}
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
  setFormData: PropTypes.func.isRequired,
  isFocus: PropTypes.bool,
  validateOnBlur: PropTypes.bool,
  serverError: PropTypes.string,
};

export default ModalForm;
