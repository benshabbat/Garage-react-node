import "./form.css";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { memo } from "react";
import { useFormState } from "./hooks/useFormState";

const Form = memo(
  ({
    title,
    inputs = [],
    onSubmit,
    handleClick = null,
    setData,
    options,
    nameSelect,
    isFocus = true,
    validateOnBlur = false,
    formData,
    serverError = null,
    isLoading = false,
  }) => {
    const { isSubmitted, handleChange, handleFormSubmit } = useFormState(setData, onSubmit);

    return (
      <form className="form" onSubmit={handleFormSubmit}>
        {handleClick && (
          <button
            type="button"
            onClick={handleClick}
            className="form-close"
            aria-label="Close form"
          >
            ×
          </button>
        )}

        <h1 className="header">{title}</h1>

        {options && nameSelect && (
          <FormSelect
            name={nameSelect}
            options={options}
            handleChange={handleChange}
            value={formData?.[nameSelect]}
          />
        )}

        {inputs.map((input, index) => (
          <FormInput
            key={input.name || index}
            input={input}
            index={index}
            handleChange={handleChange}
            isFocus={isFocus}
            isSubmitted={isSubmitted} // Pass submission state
            validateOnBlur={validateOnBlur} // Pass blur validation state
          />
        ))}

        {serverError && <span className="error">{serverError}</span>}

        <button type="submit" className="form-btn" disabled={isLoading}>
          {isLoading ? "Loading..." : title}
        </button>
      </form>
    );
  }
);

Form.propTypes = {
  title: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
  setData: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  nameSelect: PropTypes.string,
  isFocus: PropTypes.bool,
  validateOnBlur: PropTypes.bool, // Add prop type validation for blur validation
  formData: PropTypes.object, // Current form data for select values
  serverError: PropTypes.string,
  isLoading: PropTypes.bool,
};

Form.displayName = "Form";

export default Form;
