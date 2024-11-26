import { useState, useRef } from "react";
import { valid, inputType } from "../../validation/valid";

export default function FormInput({ input, handleChange, isFocus, index }) {
  const [isBlur, setIsBlur] = useState(false);
  const inputRef = useRef();

  const showError =
    isBlur &&
    (input.name === "username"
      ? input.isError
      : !valid(inputRef?.current?.value, input.name));

  return (
    <label className="form-label">
      {!input.hidden && <span>{input.name}</span>}
      {showError && (
        <span className="error">{inputType(input).errorMessage}</span>
      )}
      <input
        {...input}
        ref={inputRef}
        autoFocus={index === 0 && isFocus}
        placeholder={input.name}
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