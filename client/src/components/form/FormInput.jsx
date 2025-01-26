import { useState, useRef } from "react";
import { valid, inputType } from "../../validation/valid";
import FormToggle from "./FormToggle";

//ClassNameLabel is when i using with another stlyle for form and inputs
export default function FormInput({ input, handleChange, isFocus, index,classNameLabel }) {
  const [isBlur, setIsBlur] = useState(false);
  const inputRef = useRef();

  const showError =
    isBlur &&
    (input.name === "username"
      ? input.isError
      : !valid(inputRef?.current?.value, input.name));

  if (input.type === "checkbox") {
    return <FormToggle input={input} handleChange={handleChange} />;
  }
  return (
    <label className="form-label">
      {!input.hidden &&!classNameLabel &&<span>{input.name}</span>}
      {showError && (
        <span className="error">{inputType(input).errorMessage}</span>
      )}
      <input
        // {...input}
        pattern={input?.pattern}
        type={input?.type}
        name={input?.name}
        value={input?.value}
        // checked={input?.checked ? input?.checked : false}
        min={input?.min}
        hidden={input?.hidden}
        ref={inputRef}
        autoFocus={index === 0 && isFocus}
        placeholder={input.placeholder || input.name}
        title={inputType(input).title}
        onChange={handleChange}
        aria-invalid={valid(inputRef?.current?.value, input.name)}
        required={input.type !== "checkbox"}
        autoComplete="off"
        onBlur={() => setIsBlur(true)}
      />
    </label>
  );
}
