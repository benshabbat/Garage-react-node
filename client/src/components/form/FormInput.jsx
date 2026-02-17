import { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { valid, inputType } from "../../validation/valid";
import FormToggle from "./FormToggle";

export default function FormInput({
  input,
  handleChange,
  isFocus,
  index,
  classNameLabel = "form-label",
  isSubmitted, // Track if the form was submitted
  validateOnBlur = false, // New prop to enable validation on blur
}) {
  const [isBlur, setIsBlur] = useState(false);
  const inputRef = useRef();

  const showError =
    ((validateOnBlur && isBlur) || isSubmitted) && // Show error based on blur or submission
    (input.isError ||
      (input.isExist && !input.isError) ||
      !valid(inputRef?.current?.value, input.name));
  let errorMessage = null;
  if (showError && !inputRef?.current?.value) {
    errorMessage = "This field is required";
  } else if (showError) {
    errorMessage = inputType(input).errorMessage;
  }

  const handleBlur = useCallback(() => {
    if (validateOnBlur) {
      setIsBlur(true);
    }
  }, [validateOnBlur]);

  if (input.type === "checkbox") {
    return <FormToggle input={input} handleChange={handleChange} />;
  }
  if (input.isExist) errorMessage = input.errorExist;

  return (
    <label className={classNameLabel}>
      {!input.hidden && !classNameLabel && <span>{input.name}</span>}
      {errorMessage && (
        <span id={`${input.name}-error`} className="error">
          {errorMessage}
        </span>
      )}
      <input
        pattern={input?.pattern}
        type={input?.type}
        name={input?.name}
        value={input?.value}
        min={input?.min}
        hidden={input?.hidden}
        ref={inputRef}
        autoFocus={index === 0 && isFocus}
        placeholder={input.placeholder || input.name}
        title={inputType(input).title}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={showError}
        aria-describedby={errorMessage ? `${input.name}-error` : undefined}
        required={input.type !== "checkbox"}
        autoComplete="off"
      />
    </label>
  );
}

FormInput.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    pattern: PropTypes.string,
    min: PropTypes.number,
    hidden: PropTypes.bool,
    placeholder: PropTypes.string,
    isError: PropTypes.bool,
    isExist: PropTypes.bool,
    errorExist: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  isFocus: PropTypes.bool,
  index: PropTypes.number,
  classNameLabel: PropTypes.string,
  isSubmitted: PropTypes.bool, // Add prop type validation
  validateOnBlur: PropTypes.bool, // Add prop type validation for blur validation
};