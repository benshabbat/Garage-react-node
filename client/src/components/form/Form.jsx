import "./form.css";
import { memo } from "react";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const Form = memo(
  ({
    title,
    inputs,
    onSubmit,
    handleClick,
    setData,
    options,
    nameSelect,
    isFocus,
  }) => {
    const handleChange = (e) => {
      const { name, value, checked, type } = e.target;
      setData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    return (
      <form className="form" onSubmit={onSubmit}>
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
          />
        )}

        {inputs.map((input, index) => (
          <FormInput
            key={input.name || index}
            input={input}
            index={index}
            handleChange={handleChange}
            isFocus={isFocus}
          />
        ))}

        <button type="submit" className="form-btn">
          {title}
        </button>
      </form>
    );
  }
);

// Define PropTypes for validation
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
  options: PropTypes.arrayOf(PropTypes.string),
  nameSelect: PropTypes.string,
  isFocus: PropTypes.bool,
};

// Default props
Form.defaultProps = {
  handleClick: null,
  isFocus: true,
};
Form.displayName = "Form";

export default Form;
